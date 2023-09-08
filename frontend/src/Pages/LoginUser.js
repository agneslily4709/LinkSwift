import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginUser = () => {
        const navigate = useNavigate()
        const [user,setUser] = useState({})
        const handleSubmit = async(e) => {
                e.preventDefault()
        try {
                const res = await axios.post(`https://link-swift-backend.onrender.com/api/loginUser`, user);
                localStorage.setItem("user", JSON.stringify(res.data));
                toast.success('Login successful!', {
                  position: 'bottom-right',
                  autoClose: 3000, 
                });
                navigate(`/${res.data._id}`);
              } catch (error) {
                toast.error(`Login failed: ${error.response.data.message}`, {
                  position: 'bottom-right',
                  autoClose: 5000, 
                });
              }
        }
        const handleChange = (e) => {
                setUser({...user,[e.target.name]:e.target.value})
        }
        useEffect(()=>{
                let user_info = localStorage.getItem("user")
                if(user_info){
                        navigate(`${user_info._id}`)
                }
        },[navigate])
  return (
        <div className='form-component mt-4'>
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mb-4'>Login Form</h3>
    
          <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="..."required  name="email" onChange={handleChange} />
    
        </div>
    
    
          <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="jobTitle" placeholder="..." required name="password" onChange={handleChange} />
            </div>

    
            <button type="submit" className="mt-4 submit-btn w-100">Submit</button>
          </form>    
        </div>
  )
}

export default LoginUser