import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

const RoutesMain =()=>(
 
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>
        <Route path='*' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
   
    </Routes>
)
export default RoutesMain;