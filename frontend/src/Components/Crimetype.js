import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Crimetype() {

    const [crimetypename,setcrimetypename]=useState("");
    const [pid,setpid]=useState("");

    const [crimelst,setcrimelst]=useState([]);

    useEffect(()=>{
        getPoliceStationId();
        getAllCrimeTypeVal();
    },[])

    function getPoliceStationId()
    {
        var id=sessionStorage.getItem('stationid');   
        setpid(id); 
    }

    function handleSubmit()
    {

        if(!crimetypename)
        {
            toast.error("Please Enter Crime Type Name");
            return;   
        }

        const obj={crimetypename};

        axios.post("http://localhost:8080/addCrimeType",obj)
        .then((res)=>{
            if(res.data==="Crimetype name Added Successfully")
            {
                toast.success(res.data);
                getAllCrimeTypeVal();
            }
            else
                toast.error(res.data);
        })

        clearAll();
    }

    function getAllCrimeTypeVal()
    {
        axios.get("http://localhost:8080/getAllCrimeType")
        .then((res)=>{
            setcrimelst(res.data);
        })
    }

    function clearAll()
    {
        setcrimetypename("");
    }

  return (
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-6'>
            <h3 className='heading'>Crime Types</h3>
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Police Station Id</label>
                            <input type='text' className='form-control border-2' value={pid} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Crime Type Name</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setcrimetypename(e.target.value)} value={crimetypename} />                            
                        </div>
                        <div className='text-end'>
                            <input type='button' value="Submit" className='btn-purple' onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <h3 className='heading'>Crime Type Details</h3>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Crime Type Id</th>
                            <th>Crime Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crimelst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.ctid}</td>
                                        <td>{item.crimetypename}</td>
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
