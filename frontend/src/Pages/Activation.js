import React, {useEffect,useState} from 'react'
import axios from "axios"
import Loader from "../Assets/loader.gif"
import {useLocation,useNavigate} from "react-router-dom"
const Activation = () => {
        const [message, setMessage] = useState('');
        const [loading,setLoading] = useState(true)
        const location = useLocation();
        const navigate = useNavigate()
      useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        console.log(token)
        const activateAccount = async function(){
                const response = await axios.get(`http://localhost:5000/api/activateAccount?token=${token}`);;
                const data = response.data
                setMessage(data)
                setLoading(false)
                navigate("/loginUser")
        }
        activateAccount()
      },[location.search])
      
        return (
                <>
                {loading ? <img src={Loader} alt='Loading'/>:<></>}
                </>
        );
      }
      
      export default Activation;