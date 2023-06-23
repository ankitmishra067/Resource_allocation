import axios from 'axios'
import './css/login.css';
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {

  const navigate = useNavigate()

  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const user={
      name,
      email,
      password
    }
    try {
      
      await axios.post("http://localhost:4040/register",user).then((req,res)=>{
        if(req.data.message === "User Created"){
          navigate("/")
        }else{
          navigate("/register")
        }

      })
    } catch (error) {
      
      console.log(error);
    }
  }
  return (
    <Fragment>
      <form className="register" method='POST'  onSubmit={handleSubmit} >
        <div className='line'>
          <h1 class="form-header-lower">Sign Up</h1>
        <input type="text" value={name} placeholder='Enter Name'  onChange={(e)=>{setName(e.target.value)}} /><br />
        <input type="email"value={email} placeholder='Enter Email'  onChange={(e)=>{setEmail(e.target.value)}} /><br />
        <input type="password" value={password} placeholder='Enter Password'  onChange={(e)=>{setPassword(e.target.value)}} /><br />
        <input type="submit" value="Sign Up" />
      <div className="link">
      <span class="form-header-lower">Click to </span>
      <Link to="/">Sign In</Link>
    </div>
        </div>
      </form>
    </Fragment>
  )
}
