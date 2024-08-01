import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import Admin from './Components/Admin';
import Rto from './Components/Rto';
import PoliceStation from './Components/PoliceStation';
import Insurance from './Components/Insurance';
import Rtoboard from './Components/Rtoboard';
import Policestationboard from './Components/Policestationboard';
import Insurancedashboard from './Components/Insurancedashboard';
import Area from './Components/Area';
import Adduser from './Components/Adduser';
import Addvehicle from './Components/Addvehicle';
import Crimetype from './Components/Crimetype';
import Crimeadd from './Components/Crimeadd';
import Crimevehicle from './Components/Crimevehicle';
import Crimesearch from './Components/Crimesearch';
import Buyerdashboard from './Components/Buyerdashboard';
import Buyersearch from './Components/Buyersearch';
import Buyerdocument from './Components/Buyerdocument';
import Buyertransfer from './Components/Buyertransfer';
import Transfervehicle from './Components/Transfervehicle';
import Viewownership from './Components/Viewownership';
import Buyerview from './Components/Buyerview';
import Forgotpassword from './Components/Forgotpassword';
import Newpassword from './Components/Newpassword';
import Rtosearch from './Components/Rtosearch';

function App() {
  return (
    <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="admin" element={<Admin/>} >
            <Route path="area" element={<Area/>} />
            <Route path="rto" element={<Rto/>} />
            <Route path="policestation" element={<PoliceStation/>} />
            <Route path="insurance" element={<Insurance/>} />
          </Route>
          <Route path="rtoboard" element={<Rtoboard/>} >
            <Route path="adduser" element={<Adduser/>} />
            <Route path="addvehicle" element={<Addvehicle/>} />
            <Route path="transfervehicle" element={<Transfervehicle/>} />
            <Route path="viewownership" element={<Viewownership/>} />
            <Route path="rtosearch" element={<Rtosearch/>} />
          </Route>
          <Route path="stationboard" element={<Policestationboard/>} >
            <Route path="crimetype" element={<Crimetype/>} />
            <Route path="crimeadd" element={<Crimeadd/>} />
            <Route path="crimevehicle" element={<Crimevehicle/>} />
            <Route path="search" element={<Crimesearch/>} />
          </Route>
          <Route path="insurancedashboard" element={<Insurancedashboard/>} />
          <Route path="buyerdashboard" element={<Buyerdashboard/>} >
            <Route path="buyersearch" element={<Buyersearch/>} />
            <Route path="buyerdocument" element={<Buyerdocument/>} />
            <Route path="buyertransfer" element={<Buyertransfer/>} />
            <Route path="buyerview" element={<Buyerview/>} />
          </Route>
          <Route path="forgotpassword" element={<Forgotpassword/>} />
          <Route path="newpassword" element={<Newpassword/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
