import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Addvehicle() {

    const [vehiclename,setvehiclename]=useState("");
    const [vehicletype,setvehicletype]=useState("");
    const [vehiclecompany,setvehiclecompany]=useState("");

    const [userid,setuserid]=useState();

    const [userlst,setuserlst]=useState([]);
    const [vehiclelst,setvehiclelst]=useState([]);

    useEffect(()=>{
      getUsers();
      getAllVehicle();
    },[])

    function handleSubmit()
    {

        if(!userid)
        {
            toast.error("Please Select the User");
            return;   
        }

        if(!vehiclename)
        {
            toast.error("Enter the Vehicle Number");
            return;   
        }

        if(!vehicletype)
        {
            toast.error("Enter the Vehicle Type");
            return;   
        }

        if(!vehiclecompany)
        {
            toast.error("Please Enter the Vehicle Company Name");
            return;   
        }

        const obj={vehiclename,vehicletype,vehiclecompany};

        var rtoid=sessionStorage.getItem('rtoid');

        axios.post(`http://localhost:8080/addVehicle/${rtoid}/${userid}`,obj)
        .then((res)=>{
            if(res.data==="Vehicle Details Added Successfully")
            {
                toast.success(res.data);
                getAllVehicle();
            }
            else
                toast.error(res.data);
        })  
        clearAll();
    }

    function getUsers()
    {
        var id=sessionStorage.getItem('rtoid');

        axios.get(`http://localhost:8080/getParticularUser/${id}`)
        .then((res)=>{
            setuserlst(res.data);
        })
    }

    function clearAll()
    {
        setvehiclecompany("");
        setvehiclename("");
        setvehicletype("");
        setuserid("");
    }

    function getAllVehicle()
    {
        var id=sessionStorage.getItem('rtoid');

        axios.get(`http://localhost:8080/getVehicle/${id}`)
        .then((res)=>{
            if(res.data==null)
                toast.error("No Vehicle is added till now");
            else
                setvehiclelst(res.data);
        })

    }

  return (
    <div className='container'> 
        <div className='row align-items-center'>
            <div className='col-5'>
              <h3 className='heading'>Add Vehicle</h3>
              <div className='card border-2 p-3'>
                  <div>
                      <div>
                          <label className='form-label'>Select the User Type</label>
                          <select className='form-select border-2' onChange={(e)=>setuserid(e.target.value)} value={userid}>
                              <option value={0}>--Select--</option>
                              {
                                userlst.map((user)=>{
                                  return(
                                    <option value={user.userid}>{user.username+"-"+user.userid}</option>
                                  )
                                })
                              }
                          </select>
                      </div>
                      <div>
                          <label className='form-label'>Enter the Vehicle Name</label>
                          <input type='text' className='form-control border-2' onChange={(e)=>setvehiclename(e.target.value)} value={vehiclename} />
                      </div>
                      <div>
                          <label className='form-label'>Enter the Vehicle type</label>
                          <input type='text' className='form-control border-2' onChange={(e)=>setvehicletype(e.target.value)} value={vehicletype} />
                      </div>
                      <div>
                          <label className='form-label'>Enter the Vehicle Company</label>
                          <input type='text' className='form-control border-2' onChange={(e)=>setvehiclecompany(e.target.value)} value={vehiclecompany} />
                      </div>
                      <div className='text-end'>
                          <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                      </div>
                  </div>
              </div>
            </div>
            <div className='col-7'>
                <h3 className='heading'>Vehicle List</h3>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Vehicle Name</th>
                            <th>Vehicle Company</th>
                            <th>Vehicle Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehiclelst.map((vehicle)=>{
                                return(
                                    <tr>
                                        <td>{vehicle.adduser.username}</td>
                                        <td>{vehicle.vehiclename}</td>
                                        <td>{vehicle.vehiclecompany}</td>
                                        <td>{vehicle.vehiclenumber}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
