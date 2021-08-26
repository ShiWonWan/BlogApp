import { Fragment, useState } from "react";
import { useHistory, Link } from 'react-router-dom'

import { Navbar } from './Navbar'


export const Login = () => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleSubmitGood = () => {
    history.push('/home')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reponse = await fetch(`${process.env.REACT_APP_URL_API}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "user": user
      })
    })
    const json = await reponse.json()
    if (reponse.status === 200) {
      alert('User successfully logged in')
      localStorage.setItem('usertoken', json["token"])
      handleSubmitGood()
    }
    else {
      alert('User and/or password incorrect.')
    }
    setUser('')
    setPassword('')
    e.target.reset()
  }

  return (
    <Fragment>
                  <Navbar />

      <h2 id="welcomelogin">Welcome back!</h2>
      <form id="login" onSubmit={handleSubmit}>
        <label>
          Username <br />
          <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)}/>
        </label>
        <br />
        <label>
          Password <br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>{" "}
        <br />
        <input type="submit" value="Sign in" />
        <p>
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </p>
      </form>
    </Fragment>
  );
};

export const Register = () => {

  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleSubmitGood = () => {
      history.push('/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reponse = await fetch(`${process.env.REACT_APP_URL_API}/user/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "password": password,
        "user": user
      })
    })
    if (reponse.status === 200) {
      alert('User successfully registered')
      handleSubmitGood()
    }
    else {
      alert('User exists or 1 or more than 1 value is missing')
    }
    setUser('')
    setName('')
    setPassword('')
    e.target.reset()
  }

  return (
    <Fragment>
      <Navbar />
      <h2 id="welcome">Welcome!</h2>
      <form id="register" onSubmit={handleSubmit}>
        <label>
          Username <br />
          <input type="text" placeholder="Username (ej. NoobDestroyer98)" value={user} onChange={e => setUser(e.target.value)} />
        </label>
        <br />
        <label>
          Name <br />
          <input type="text" placeholder="Name (ej. Ramiro Smith)" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Password <br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>{" "}
        <br />
        <input type="submit" value="Sign up" />
        <p>
          Already registered? <Link to="/signin" className="link">Sign in</Link>
        </p>
      </form>
    </Fragment>
  );
};
