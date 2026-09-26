import React, { useState, useEffect } from 'react'
import { Header } from './Header.jsx'
import { Login } from './Login.jsx'
import "./App.css";

const Todo = props => (
  <li>{props.name} : 
    <input
      type="checkbox"
      defaultChecked={props.completed}
      onChange={ e => props.onclick( props.name, e.target.checked )
    }/>
  </li>
)

const App = () => {
  const [isLoggedIn, setLogin] = useState(false)

  function handleLogin(){
    setLogin(!isLoggedIn)
  }
  
  //checks the login status when the page loads in case of refresh
  useEffect( async ()=> {
    const loginStatus = (await fetch('/status'))
      .then(response => response.json())
      .then(json => {
        setLogin(json.status)
      })
  })

  return (
    <>
      <Header isLoggedIn = {isLoggedIn} onLogout = {handleLogin}/>
      isLoggedIn ? <Dashboard/> : <Login onLogin={handleLogin}/>
    </>
  );
}

export default App