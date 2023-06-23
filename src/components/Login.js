import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/login.css'
export default function Login() {

  const navigate = useNavigate()
  
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const user={
      email,
      password
    }
    try {
      
      await axios.post("http://localhost:4040/login",user).then((req,res)=>{
        if(req.data.message==="login successfull"){
          alert("You're logged in! ")
          navigate("/Dashboard")
        }
        if(req.data.message==="Invalid password or email"){
          alert("Wrong password or email")
          navigate("/")
        }
        if(req.data.message==="User not registered, Please Register first"){
          alert("User not registered")
          navigate("/register")
        }
      })
    } catch (error) {
      
      console.log(error);
    }
  }




  return (
    <Fragment>

    <form className="login" method='POST' onSubmit={handleSubmit}>
      <div className="line">
        <div className='design'>

        <h1 class="form-header-lower">Sign In</h1>
        </div>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=' Email' /><br />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder=' Password' /><br />
      <input type="submit" value="Sign In" />
    <div className="link">
      <span class="form-header-lower">Click to </span>
      <Link to="/Register" >Sign Up</Link>
    </div>
      </div>
    </form>



    </Fragment>
  )
}
