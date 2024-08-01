import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import rtooffice from '../rtooffice.webp';

export default function Rto() {

    const [staffname,setstaffname]=useState("");
    const [staffemail,setstaffemail]=useState("");
    const [staffphone,setstaffphone]=useState("");
    const [staffaddress,setstaffaddress]=useState("");

    const [allstaff,setallstaff]=useState([])

    useEffect(()=>{
        getStaff();
    },[])

    function handleSubmit()
    {

        if(!staffname)
        {
            toast.error("Enter the Staff Name");
            return;   
        }

        if(!staffemail)
        {
            toast.error("Enter the Email ID");
            return;   
        }

        if(!staffphone)
        {
            toast.error("Enter the phone Nmuber");
            return;   
        }

        if(!staffaddress)
        {
            toast.error("Enter the staff Address");
            return;   
        }

        const obj={staffname,staffemail,staffphone,staffaddress};

        axios.post("http://localhost:8080/addRtoStaff",obj)
        .then((res)=>{
            if(res.data==="Rto Staff Added Successfully")
            {
                toast.success(res.data);
                getStaff(); 
            }
            else
                toast.error(res.data);
        })

        clearAll();
    }

    function clearAll()
    {
        setstaffname("");
        setstaffemail("");
        setstaffphone("");
        setstaffaddress("");
    }

    function getStaff()
    {
        axios.get("http://localhost:8080/getAllStaff")
        .then((res)=>{
            setallstaff(res.data);
        })
    }

  return (
    <div className='container'>
        <h3 className='heading mb-3'>RTO Details</h3>
        <div className='row align-items-center'>
            <div className='col-7'>
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the Staffname</label>
                            <input type='text' className='form-control border-2' onChange={(e)=>setstaffname(e.target.value)} value={staffname} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff Email ID</label>
                            <input type="text" className='form-control border-2'onChange={(e)=>setstaffemail(e.target.value)} value={staffemail} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff Phone Number</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setstaffphone(e.target.value)} value={staffphone} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Staff Address</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setstaffaddress(e.target.value)} value={staffaddress} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type="button" className='btn-purple' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-5'>
                <img src={rtooffice} alt="" className='img-fluid border-purple' style={{height:"400px"}} />
            </div>
        </div>
        <div>
            <h3 className='heading mb-3 mt-3'>RTO Staff Details</h3>
            <table className='table table-striped text-center mt-3'>
                <thead>
                    <tr>
                        <th>Staff Name</th>
                        <th>Staff Email</th>
                        <th>Staff Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allstaff.map((item)=>{
                            return(
                                <tr>
                                    <td>{item.staffname}</td>
                                    <td>{item.staffemail}</td>
                                    <td>{item.staffphone}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
