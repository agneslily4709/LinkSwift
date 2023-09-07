import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const LoginUser = () => {
        const navigate = useNavigate()
        const [user,setUser] = useState({})
        const handleSubmit = async(e) => {
                e.preventDefault()
            await axios.post(`http://localhost:5000/api/loginUser`,user)
            .then(() => console.log("success"))
            localStorage.setItem("user",JSON.stringify(user))
            navigate("/")
        }
        const handleChange = (e) => {
                setUser({...user,[e.target.name]:e.target.value})
        }
  return (
        <div className='form-component mt-4'>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mb-4'>Login Form</h3>
    
          <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="..."  name="email" onChange={handleChange} />
    
        </div>
    
    
          <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="jobTitle" placeholder="..."name="password" onChange={handleChange} />
            </div>

    
            <button type="submit" className="mt-4 submit-btn w-100">Submit</button>
          </form>    
        </div>
  )
}

export default LoginUser