import Employee from './Employee'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/home.css'
import axios from 'axios'

export default function Home() {

  const navigate = useNavigate()

  const [employee, setEmployee]= useState([])
  const [assignedEmployee, setassignedEmployee]= useState([])
  const [billedEmployee, setbilledEmployee]= useState([])
useEffect(()=>{

  async function getEmployee(){
    try {
      await axios.get("http://localhost:4040/getemployee").then((req,res)=>{
        setEmployee(req.data.employee)
      })
    } catch (error) {
      console.log(error);
    }
    }
    getEmployee()

    async function getassignedEmployee(){
      try {
        await axios.get("http://localhost:4040/getassigned").then((req,res)=>{
          setassignedEmployee(req.data.assignedemployee)
        })
      } catch (error) {
        console.log(error);
      }
    }
    getassignedEmployee()
    async function getbilledEmployee(){
      try {
        await axios.get("http://localhost:4040/getbilled").then((req,res)=>{
          setbilledEmployee(req.data.billedemployee)
        })
      } catch (error) {
        console.log(error);
      }
    }
    getbilledEmployee()
    
  
    
  })
  
  async function handleemployee(id){
    try {
      await axios.post(`http://localhost:4040/assign/${id}`).then((req,res)=>{
        if(req.data.message === "assignedclick"){
          navigate(`/choosedate/${id}`)
          alert("Choose a date to initiate")
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAssignedemployee(id){
    try {
      await axios.post(`http://localhost:4040/deleteassigned/${id}`).then((req,res)=>{
        if(req.data.message === "deleted"){
          alert("Employee Removed")
        }        
      })
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteBilledemployee(id){
    try {
      await axios.post(`http://localhost:4040/deletebilled/${id}`).then((req,res)=>{
        if(req.data.message === "deleted"){
          alert("Employee Removed")
        } 
      })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <h1 className='title'>Resource Management </h1>
    <div className="box">
    <div className="employee">
      <Employee/>
    </div>
    </div>
    <div className="container">
      <div className="column">
        <h3>Available</h3>
        <ul>
        {
          employee.map((emp,i)=>
            <li key={i}>{emp.name}
              <p>{emp.desc}</p>
              <button onClick={()=>handleemployee(emp._id)}>Associate with project</button>
            </li>
          )
        }
        </ul>
      </div>
      <div className="column">
        <h3>Assigned</h3>
        <ul>
        {
          assignedEmployee.map((emp,i)=>
            <li key={i}>{emp.name}
              <p>{emp.desc}</p>
              <p>{emp.date}</p>
              <button onClick={()=>deleteAssignedemployee(emp._id)}>Remove</button>
            </li>
          )
        }
        </ul>
      </div>
      <div className="column">
        <h3>Billable</h3>
        <ul>
        {
          billedEmployee.map((emp,i)=>
            <li key={i}>{emp.name}
              <p>{emp.desc}</p>
              <p>{emp.date}</p>
              <button onClick={()=>deleteBilledemployee(emp._id)}>Remove</button>
            </li>
          )
        }
          
        </ul>
      </div>
    </div>

    
    
    </>
  )
}