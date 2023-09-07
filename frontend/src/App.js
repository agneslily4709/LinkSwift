import './App.css';
import Navbar from './Components/Navbar';
import { Routes,Route } from 'react-router-dom';
import RegisterUser from './Pages/RegisterUser';
import LoginUser from './Pages/LoginUser';
import Activation from './Pages/Activation';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className='container'>
    <Navbar/>
    <Routes>
                    <Route path='/registerUser' element={<RegisterUser/>}/>
                    <Route path='/loginUser' element={<LoginUser/>}/>
                    <Route path='/activate' element={<Activation/>}/>
                    <Route path='/' element={<Dashboard/>}/>

              </Routes>
    </div>
  );
}

export default App;
