import { Link } from 'react-router-dom'
import { IoPersonCircleSharp } from 'react-icons/io5'

export const Navbar = () => {
    return (
        <div id="navbar">
                <ul>
                    <li>
                        <Link to="/" className="aNavBar">Home</Link>               
                    </li>
                    <li>
                        <Link to="/signin" className="aNavBar">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="aNavBar">Sign Up</Link>
                    </li>
                </ul>
            </div>
    )
}

export const ProtectedNavbar = (props) => {

    const LogOut = () =>{
        localStorage.clear()
    }

    return (
        <div id="navbar">
                <ul>
                    <li>
                        <Link to="/" className="aNavBar">Home</Link>               
                    </li>
                    <li id="user">
                        <IoPersonCircleSharp id="icon" /> <p>{props.user}</p>
                    </li>
                    <li>
                        <Link to="/" className="aNavBar">Log Out{LogOut}</Link>
                    </li>
                </ul>
            </div>
    )
}