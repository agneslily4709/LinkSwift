import React,{useEffect, useState} from 'react'
import axios from "axios"

const Dashboard = () => {
        const [user,setUser] = useState({email:"",url:""})
        const handleSubmit = async(e) => {
                e.preventDefault()
            await axios.post(`http://localhost:5000/api/shortUrl`,user)
            .then(() => console.log("success"))
            console.log(user)
        }
        useEffect(() => {
               let user_info =  localStorage.getItem("user")
               setUser({...user,["email"]:JSON.parse(user_info).email})
        },[])
  return (
    <div>
            <form className='form-component' onSubmit={handleSubmit}>
            <h3 className='text-center mb-4'>Form</h3>
    
          <div className="mb-4">
              <label htmlFor="url" className="form-label">URL</label>
              <input type="url" className="form-control" id="url" placeholder="..."  name="url" onChange={(e) => setUser({...user,[e.target.name]:e.target.value})} />
        </div>
            <button type="submit" className="mt-4 submit-btn w-100">Submit</button>
          </form>    
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full URL</th>
      <th scope="col">Short URL</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
    </div>
    
  )
}

export default Dashboard