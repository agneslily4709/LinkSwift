import React,{useCallback, useEffect, useState} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import Loader from "../Assets/loader.gif"

const Dashboard = () => {
        const initialFormState = {full: ''}
        const [formData, setFormData] = useState(initialFormState);
        const [data,setData] = useState(null)
        const [loading,setLoading] = useState(true)

        const params = useParams()
        const handleSubmit = async(e) => {
            e.preventDefault()
                await axios.post(`https://link-swift-backend.onrender.com/api/shortUrl/${params.id}`,formData)
            setFormData(initialFormState);
            loadData();
        }
        const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData({  ...formData,  [name]: value,});
              };
              const  loadData  =useCallback( async  ()=> {
                try {
                        const res = await axios.get(`https://link-swift-backend.onrender.com/api/getAllUrls/${params.id}`);
                        setData(res.data);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }                            
        },[params.id])
        const handleShortUrlClick = async(item) => {
                const res = await axios.get(`https://link-swift-backend.onrender.com/api/${params.id}?shortUrl=${item.short}`)
                window.open(res.data,"_blank")
                loadData()
              };
        useEffect(() => {
                loadData()
                setLoading(false)
        },[params.id,loadData])
  return (
    <div>
       {loading ?  <img className='loader' src={Loader} alt='Not'/>
       :<>
            <form className='form-component' onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input type="url" className="form-control" placeholder="..."  id="full"  value={formData.full} required  name="full" onChange={handleInputChange} />
                <button className="submit-btn w-25" type="submit" id="button-addon2">Shorten URL</button>
            </div>
          </form>    
            <div className='content'>
                        <table className="table">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Full URL</th>
                <th scope="col">Short URL</th>
                <th scope="col">Clicks</th>
                </tr>
                </thead>
                <tbody>
                {data ? data.map((item, i) => (
                <tr key={i}>
                <th scope="row">{i+1}</th>
                <td><a href={item.full}>{item.full}</a></td>
                <td><button className='btn btn-primary w-50'  onClick={()=>handleShortUrlClick(item)}>{item.short}</button></td>
                <td>{item.clicks}</td>
                </tr>
                )) : <tr><td>No urls yet. Start shortening your URLs</td></tr>}

                </tbody>
                </table>
            </div>
            </>}
    </div>
    
  )
}

export default Dashboard