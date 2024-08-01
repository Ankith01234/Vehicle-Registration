import React, { useEffect, useState } from 'react';
import './Info.css';
import policestation from '../policestation.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PoliceStation() {

  const [stationname,setstationname]=useState("");
  const [stationemail,setstationemail]=useState("");
  const [stationphone,setstationphone]=useState("");
  const [stationaddress,setstationaddress]=useState("");
  const [areaid,setareaid]=useState("");

  const [allstation,setallstation]=useState([]);
  const [arealst,setarealst]=useState([]);

  useEffect(()=>{
    getStations();
    getArea();
  },[])

  function handleSubmit()
  {

    if(areaid==0)
    {
        toast.error("Please Select the Area Id");
        return; 
    }

    if(!stationname)
    {
        toast.error("Enter the Police Station Name");
        return; 
    }

    if(!stationemail)
    {
        toast.error("Enter the Station email");
        return; 
    }

    if(!stationphone)
    {
        toast.error("Enter the Station Phone");
        return; 
    }

    if(!stationaddress)
    {
        toast.error("Enter the station address");
        return; 
    }

    const obj={stationname,stationemail,stationphone,stationaddress};

    axios.post(`http://localhost:8080/addStation/${areaid}`,obj)
    .then((res)=>{
      if(res.data==="Police Station added Successfully")
      {
        toast.success(res.data);
        getStations(); 
      }
      else
        toast.error(res.data);
    })
    clearAll();
  }

  function clearAll()
  {
    setstationname("");
    setstationemail("");
    setstationphone("");
    setstationaddress("");
    setareaid("");
  }

  function getStations()
  {
    axios.get("http://localhost:8080/getAllStations")
    .then((res)=>{
        setallstation(res.data);
    })
  }

  function getArea()
  {
      axios.get("http://localhost:8080/getAllArea")
      .then((res)=>{
          setarealst(res.data);
      })
  }

  return (
    <div className='container'>
      <h3 className='heading mb-3'>Police Station Details</h3>
        <div className='row align-items-center'>
          <div className='col-7'>
            <div className='card border-2 p-3'>
              <div>
                  <div>
                      <label className='form-label'>Select Area</label>
                      <select className='form-select border-2' onChange={(e)=>setareaid(e.target.value)} value={areaid}>
                        <option value={0}>--Select--</option>
                        {
                          arealst.map((item)=>{
                            return(
                              <option value={item.areaid}>{item.areaname}</option>
                            )
                          })
                        }
                      </select>
                  </div>
                  <div className='mt-2'>
                      <label className='form-label'>Enter the Police Station Name</label>
                      <input type='text' className='form-control border-2' onChange={(e)=>setstationname(e.target.value)} value={stationname} />
                  </div>
                  <div className='mt-2'>
                      <label className='form-label'>Enter the Station Email</label>
                      <input type='text' className='form-control border-2' onChange={(e)=>setstationemail(e.target.value)} value={stationemail} />
                  </div>      
                  <div className='mt-2'>
                      <label className='form-label'>Enter the Station Phone Number</label>
                      <input type='text' className='form-control border-2' onChange={(e)=>setstationphone(e.target.value)} value={stationphone} />
                  </div>       
                  <div className='mt-2'>
                      <label className='form-label'>Enter the Station Address</label>
                      <input type='text' className='form-control border-2' onChange={(e)=>setstationaddress(e.target.value)} value={stationaddress} />
                  </div> 
                  <div className='text-end mt-2'>
                      <input type="button" className='btn-purple' value="Submit" onClick={handleSubmit} />
                  </div>
              </div>
            </div>
          </div>
          <div className='col-5'>
              <img src={policestation} alt="" className='img-fluid border-purple' style={{height:"330px",width:"430px"}} />
          </div>
        </div>
        <div>
          <h3 className='heading mb-3 mt-4'>Police Station List</h3>
          <table className='table table-striped text-center'>
              <thead>
                <tr>
                  <th>Police Station Name</th>
                  <th>Police Station Email</th>
                  <th>Police Station Phone Number</th>
                  <th>Police Station Address</th>
                  <th>Police Station Area Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  allstation.map((item)=>{
                    return(
                      <tr>
                        <td>{item.stationname}</td>
                        <td>{item.stationemail}</td>
                        <td>{item.stationphone}</td>
                        <td>{item.stationaddress}</td>
                        <td>{item.area.areaname}</td>
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
