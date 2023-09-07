import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const RegisterUser = () => {
        const navigate = useNavigate()
        const [user,setUser] = useState({})
        const handleSubmit = async(e) => {
                e.preventDefault()
               await axios.post(`http://localhost:5000/api/registerUser`,user)
                .then(() => console.log("success"))
                .catch((error) => console.error("Registration error:", error))
        //     navigate("/login")
        }
        const handleChange = (e) => {
                setUser({...user,[e.target.name]:e.target.value})
        }
  return (
        <div className='form-component mt-4'>
        <form onSubmit={handleSubmit}>
           
          <h3 className='text-center mb-4'>Registration Form</h3>
      
          <div className='row'>
          <div className="mb-4 col">
              <label htmlFor="firstName" className="form-label">FirstName</label>
              <input  type="text"  className="form-control"  id="firstName"  placeholder="..."  name="firstName"  onChange={handleChange} />
            </div>
    
            <div className="mb-4 col">
              <label htmlFor="lastName" className="form-label">lastName</label>
              <input  type="text"  className="form-control"  id="lastName"  placeholder="..."  name="lastName"  onChange={handleChange} />
            </div>
          </div>
    
          <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="..."  name="email" onChange={handleChange} />
        </div>
    
          <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="jobTitle" placeholder="..."name="password" onChange={handleChange} />
            </div>

            <button type="submit" className="mt-3 submit-btn w-100">Submit</button>
          </form>    
        </div>
  )
}

export default RegisterUser