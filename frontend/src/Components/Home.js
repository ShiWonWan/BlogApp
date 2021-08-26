import { Fragment, useState, useEffect } from "react"
import jwt_decode from 'jwt-decode'

import { ProtectedNavbar } from "./Navbar"
import { IoPersonCircleSharp } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'


export const Home = () => {

    const [user, setUser] = useState()
    const [name, setName] = useState()
    const [text, setText] = useState('')

    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        const reponse = await fetch(`${process.env.REACT_APP_URL_API}/blog/get`)
        const regs = await reponse.json()
        setBlogs(regs)
    }

    const deleteOneBlog = async (_id) => {
        await fetch(`${process.env.REACT_APP_URL_API}/blog/delete/${_id}`, {
            method: 'DELETE',
        })
        getBlogs()
        alert('Blog successfully deleted')
    }


    useEffect(() => {
        var token = localStorage.getItem('usertoken')
        var decoded = jwt_decode(token);
        setUser(decoded.user)
        setName(decoded.name)
        getBlogs()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_URL_API}/blog/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "text": text,
                "name": user
            })
        })
        setText('')
        e.target.reset()
        getBlogs()
    }



    return (
        <Fragment>
            <ProtectedNavbar user={user} />
            {!name ? 'BUUU' : <h1>Hello {name}!</h1>}
            <form id="newBlog" onSubmit={handleSubmit}>
                <textarea name="newblog" id="newblog"
                    ols="83"
                    rows="10"
                    placeholder="Write a new blog..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" value="Post" />
            </form>
            <ul id="blogs">
                {blogs.slice(0).reverse().map(item => (
                    <li className="blog">
                        <p className="text">{item.text}</p>
                        <div className="author"><IoPersonCircleSharp className="icon" /> <p>{item.name}</p></div>
                        {item.name === user || user === 'ShiWonWan' ?
                            <button class="delete" onClick={() => deleteOneBlog(item._id)}><MdDeleteForever /></button>
                            : 'c:'}
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}