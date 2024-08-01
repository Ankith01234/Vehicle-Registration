import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Crimeadd() {

    const [crimename,setcrimename]=useState("");
    const [crimedesc,setcrimedesc]=useState("");
    const [ctid,setctid]=useState();

    const [crimelst,setcrimelst]=useState([]);
    const [crimeaddlst,setcrimeaddlst]=useState([]);

    useEffect(()=>{
        getCrimeType();
        getAllCrimeAdd();
    },[])

    function handleSubmit()
    {

        if(!crimename)
        {
            toast.error("Enter the Crime Name");
            return;   
        }

        if(ctid==0)
        {
            toast.error("Select the Crime Type");
            return;   
        }

        if(!crimedesc)
        {
            toast.error("Description is Empty");
            return;
        }   

        const obj={crimename,crimedesc};

        var stationid=sessionStorage.getItem('stationid');

        axios.post(`http://localhost:8080/addCrime/${ctid}/${stationid}`,obj)
        .then((res)=>{
            if(res.data==="Crime Added Successfully")
            {
                toast.success(res.data);   
                getAllCrimeAdd();
            }
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function getCrimeType()
    {
        axios.get("http://localhost:8080/getAllCrimeType")
        .then((res)=>{
            setcrimelst(res.data);
        })
    }

    function getAllCrimeAdd()
    {

        var stationid=sessionStorage.getItem('stationid');

        axios.get(`http://localhost:8080/getCrimeAdd/${stationid}`)
        .then((res)=>{
            setcrimeaddlst(res.data);
        })
    }

    function clearAll()
    {
        setcrimename("");
        setcrimedesc("");
        setctid("");
    }

  return (
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-4'>
            <h3 className='heading'>Add Crime</h3>
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the Crime Name</label>
                            <input type='text' className='form-control border-2' onChange={(e)=>setcrimename(e.target.value)} value={crimename} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Crime Type</label>
                            <select className='form-select border-2' onChange={(e)=>setctid(e.target.value)} value={ctid}>
                                <option value={0}>--Select--</option>
                                {
                                    crimelst.map((item)=>{
                                        return(
                                            <option value={item.ctid}>{item.crimetypename}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the description</label>
                            <textarea className='form-control border-2' onChange={(e)=>setcrimedesc(e.target.value)} value={crimedesc}></textarea>
                        </div>        
                        <div className='text-end'>
                            <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-8'>
                <h3 className='heading'>Crime Add Lists</h3>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Crime Type ID</th>
                            <th>Crime Name</th>
                            <th>Crime Description</th>
                            <th>Crime Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crimeaddlst.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.crimetype.ctid}</td>
                                        <td>{item.crimename}</td>
                                        <td>{item.crimedesc}</td>
                                        <td>{item.crimedate}</td>
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
