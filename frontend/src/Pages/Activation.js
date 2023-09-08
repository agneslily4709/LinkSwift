import React, {useEffect,useState} from 'react'
import axios from "axios"
import Loader from "../Assets/loader.gif"
import {useLocation,useNavigate} from "react-router-dom"
const Activation = () => {
        const [loading,setLoading] = useState(true)
        const location = useLocation();
        const navigate = useNavigate()
      useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const activateAccount = async function(){
                await axios.get(`https://link-swift-backend.onrender.com/api/activateAccount?token=${token}`);;
                setLoading(false)
                navigate("/loginUser")
        }
        activateAccount()
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[navigate])
      
        return (
                <>
                {loading ? <img src={Loader} alt='Loading'/>:<></>}
                </>
        );
      }
      
      export default Activation;