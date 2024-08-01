import React, { useEffect, useState } from 'react';
import './Info.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Insurancedashboard() {

    const [vehno,setvehno]=useState("");
    const [amount,setamount]=useState();

    const [insuranceid, setinsuranceid] = useState();
    const [vehiclelst,setvehiclelst]=useState([]);

    useEffect(() => {
        getInsuranceId();
        getAllVehicleInsurance();
    }, [])

    function getInsuranceId() {
        var id = sessionStorage.getItem('insuranceid');
        setinsuranceid(id);
    }

    function handleLogout()
    {
        sessionStorage.removeItem('insuranceid');
    }

    function handleSubmit()
    {
        const obj={amount};

        var id=sessionStorage.getItem('insuranceid');

        axios.post(`http://localhost:8080/addVehicleInsurance/${id}/${vehno}`,obj)
        .then((res)=>{
            if(res.data==="Vehicle Number or Insurance Company Mismatch"||res.data==="Vehicle Name Already Exists")
                toast.error(res.data);
            else
            {
                toast.success(res.data);
                getAllVehicleInsurance();
            }
        })

        clearAll();
    }

    function getAllVehicleInsurance()
    {

        var id = sessionStorage.getItem('insuranceid');

        axios.get(`http://localhost:8080/getVehicleInsurance/${id}`)
        .then((res)=>{
            setvehiclelst(res.data);
        })
    }

    function clearAll()
    {
        setvehno("");
        setamount("");
    }

    return (
        <>
            <div className='text-end me-4 mb-1 mt-3'>
                <Link to="/" className='btn btn-warning' onClick={handleLogout}>LogOut</Link>
            </div>
            <div className='container'>
                <h3 className='heading mt-3'>Insurance Dashboard</h3>
                <div className='card border-2 p-3'>
                    <div>
                        <label className='form-label'>Insurance Company ID</label>
                        <input type="text" className='form-control border-2' value={insuranceid} />
                    </div>
                    <div className='mt-2'>
                        <label className='form-label'>Enter the Vehicle Number</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setvehno(e.target.value)} value={vehno} />
                    </div>
                    <div className='mt-2'>
                        <label className='form-label'>Enter the Amount</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setamount(e.target.value)} value={amount} />
                    </div>
                    <div className='text-end'>
                        <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                    </div>
                </div>
                <div>
                    <h3 className='heading mt-4'>List of Vehicles</h3>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Vehicle Number</th>
                                <th>User Name</th>
                                <th>User Phone</th>
                                <th>user Email</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vehiclelst.map((item)=>{
                                    return(
                                        <tr>
                                            <td>{item.addvehicle.vehiclenumber}</td>
                                            <td>{item.addvehicle.adduser.username}</td>
                                            <td>{item.addvehicle.adduser.userphone}</td>
                                            <td>{item.addvehicle.adduser.useremail}</td>
                                            <td>{item.startdate}</td>
                                            <td>{item.enddate}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
