import './App.css';
import Navbar from './Components/Navbar';
import { Routes,Route } from 'react-router-dom';
import RegisterUser from './Pages/RegisterUser';
import LoginUser from './Pages/LoginUser';
import Activation from './Pages/Activation';
import Dashboard from './Components/Dashboard';
import Logout from './Pages/Logout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='container'>
    <Navbar/>
    <Routes>
                    <Route path='/registerUser' element={<RegisterUser/>}/>
                    <Route path='/loginUser' element={<LoginUser/>}/>
                    <Route path='/activate' element={<Activation/>}/>
                    <Route path='/:id' element={<Dashboard/>}/>
                    <Route path='/logout' element={<Logout/>}/>
              </Routes>
              <ToastContainer/>
    </div>
  );
}

export default App;
