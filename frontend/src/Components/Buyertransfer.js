import React, { useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Buyertransfer() {

  const [vehno, setvehno] = useState("");
  const [val, setval] = useState(false);
  const [msg,setmsg]=useState("");

  const [uservehlst, setuservehlst] = useState({});

  function handleClear() 
  {
    setval(false);
    setvehno("");
    setuservehlst("");
  }

  function handleSearch() 
  {
    axios.get(`http://localhost:8080/getUserVehDetails/${vehno}`)
      .then((res) => {
        if (typeof res.data === 'object')
        {
          setuservehlst(res.data);
          setval(true);
          setmsg("");
        }
        else {
          setmsg(res.data);
          setval(false);
        }
      })
  }

  function handleTransfer()
  {
      var id=sessionStorage.getItem('buyerid');

      axios.post(`http://localhost:8080/addTransfer/${vehno}/${id}`)
      .then((res)=>{
          if(res.data==="Data sent to RTO for Acceptation")        
              toast.success(res.data);
          else
              toast.error(res.data);
      })

  }

  return (
    <div className='container'>
      <h3 className='heading'>Transfer Dashboard</h3>
      <div className='card border-2 p-3 bg-light '>
        <div>
          <div className='card border-2 p-3'>
            <div>
              <div className='text-center'>
                <label className='form-label'>Enter the Vehicle Number</label>
                <input type='search' className='form-control border-2' placeholder="Search" onChange={(e) => setvehno(e.target.value)} value={vehno} />
              </div>
              <div className='text-end'>
                <input type='button' className='btn-purple me-2' value='clear' onClick={handleClear} />
                <input type='button' className='btn-purple' value="Submit" onClick={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card border-2 p-3 bg-light mt-4 mb-5'>
        <div className='card border-2 p-3'>
          <h3 className='heading'>Vehicle Details</h3>
          <div className='card border-2 p-3'>
            {
              val
              ?
              (
                <table className='table table-striped text-center'>
                  <thead>
                    <tr>
                      <th>Vehicle Number</th>
                      <th>Vehicle Name</th>
                      <th>Vehicle Company</th>
                      <th>Vehicle Type</th>  
                      <th></th>                                          
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>{uservehlst.vehiclenumber}</td>
                        <td>{uservehlst.vehiclename}</td>
                        <td>{uservehlst.vehiclecompany}</td>
                        <td>{uservehlst.vehicletype}</td>     
                        <td><input type='button' className='btn btn-success' value='Transfer' onClick={handleTransfer} /></td>                                           
                    </tr>
                  </tbody>
                </table>
              )
              :
              (
                <h6 className='text-center'>{msg}</h6>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
