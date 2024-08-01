import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Crimevehicle() {

    const [vehno,setvehno]=useState("");
    const [crimeid,setcrimeid]=useState();

    const [crimeaddlst,setcrimeaddlst]=useState([]);
    const [crimevehlst,setcrimevehlst]=useState([]);

    useEffect(()=>{
        getCrimeAdd();
        getCrimeVehicle();
    },[])

    function handleSubmit()
    {

        if(!vehno)
        {
            toast.error("Please enter the vehicle number");
            return;   
        }

        if(!crimeid)
        {
            toast.error("Please select the Crime id");
            return;   
        }

        axios.post(`http://localhost:8080/addCrimeToVehicle/${crimeid}/${vehno}`)  
        .then((res)=>{
            if(res.data==="Vehicle Crime Added successfully")    
                toast.success(res.data);
            else
            {
                toast.error(res.data);
                return;
            }

            axios.put(`http://localhost:8080/updateCrime/${crimeid}`)
            .then((res)=>{
                if(res.data==="Status updated successfully")
                {
                    toast.success(res.data);
                    getCrimeVehicle();
                    getCrimeAdd();
                }
                else
                    toast.error(res.data);
            })

        })

        clearAll();

    }

    function getCrimeAdd()
    {
        var stationid=sessionStorage.getItem('stationid');

        axios.get(`http://localhost:8080/getCrimeAdd/${stationid}`)
        .then((res)=>{
            setcrimeaddlst(res.data);
        })
    }

    function getCrimeVehicle()
    {

        var stationid=sessionStorage.getItem('stationid');

        axios.get(`http://localhost:8080/getAllCrimeVehicle/${stationid}`)
        .then((res)=>{
            setcrimevehlst(res.data);
        })

        console.log(crimevehlst);
        console.log("----");
    }

    function clearAll()
    {
        setvehno("");
        setcrimeid("");
    }

  return (
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-5'>
            <h3 className='heading'>Crime Vehicle Details</h3>  
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the Vehicle Number</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setvehno(e.target.value)} value={vehno} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Crime Id</label>
                            <select className='form-select border-2' onChange={(e)=>setcrimeid(e.target.value)} value={crimeid} >
                                <option value={0}>--Select--</option>
                                {
                                    crimeaddlst.map((item)=>{
                                        return(
                                            <option value={item.cid}>{item.cid+" - "+item.crimename}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='text-end'>
                            <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-7'>
                <h3 className='heading'>Crime vehicle Details</h3>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Crime Type Id</th>
                            <th>Vehicle Number</th>                        
                            <th>Crime ID & Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crimevehlst.map((item)=>{
                                return(
                                    <tr>                                
                                        <td>{item[1]}</td>
                                        <td>{item[5]}</td>                                    
                                        <td>{item[0]+" - "+item[2]}</td>
                                        <td>{item[4]}</td>
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
