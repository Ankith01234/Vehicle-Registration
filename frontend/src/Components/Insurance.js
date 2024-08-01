import React, { useEffect, useState } from 'react';
import './Info.css';
import insurance from '../insurance.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Insurance() {

  const [companyname,setcompanyname]=useState("");
  const [companyphone,setcompanyphone]=useState("");
  const [companyemail,setcompanyemail]=useState("");
  const [companyaddress,setcompanyaddress]=useState("");

  const [companylst,setcompanylst]=useState([])

  useEffect(()=>{
    getInsurance();
  },[])

  function handleSubmit()
  {

      if(!companyname)
      {
          toast.error("Enter the Company Name");
          return; 
      }

      if(!companyphone)
      {
          toast.error("Enter the Company phone Number");
          return; 
      }

      if(!companyemail)
      {
          toast.error("Enter the Company Email Id");
          return; 
      }

      if(!companyaddress)
      {
          toast.error("Enter the Company Address");
          return; 
      }

      const obj={companyname,companyphone,companyemail,companyaddress};

      axios.post("http://localhost:8080/addInsuranceCompany",obj)
      .then((res)=>{
        if(res.data==="Insurance Company Added Successfully")
        {
          toast.success(res.data);
          getInsurance();
        }
        else
          toast.error(res.data);
      })

      clearAll();

  }

  function clearAll()
  {
    setcompanyemail("");
    setcompanyname("");
    setcompanyphone("");
    setcompanyaddress("");
  }

  function getInsurance()
  {
    axios.get("http://localhost:8080/getAllInsurance")
    .then((res)=>{
        setcompanylst(res.data);
    })
  }

  return (
    <div className='container'>
        <h3 className='heading mb-3'>Insurance Company Details</h3>
        <div className='row align-items-center'>
          <div className='col-7'>
            <div className='card border-2 p-3'>
              <div>
                <div>
                  <label className='form-label'>Enter the Insurance Company Name</label>
                  <input type='text' className='form-control border-2' onChange={(e)=>setcompanyname(e.target.value)} value={companyname} />
                </div>
                <div className='mt-2'>
                  <label className='form-label'>Enter the Insurance Company Phone Number</label>
                  <input type="text" className='form-control border-2' onChange={(e)=>setcompanyphone(e.target.value)} value={companyphone} />
                </div> 
                <div>
                  <label className='form-label'>Enter the Email ID</label>
                  <input type="text" className='form-control border-2' onChange={(e)=>setcompanyemail(e.target.value)} value={companyemail} />
                </div>
                <div>
                  <label className='form-label'>Enter the Address</label>
                  <input type='text' className='form-control border-2' onChange={(e)=>setcompanyaddress(e.target.value)} value={companyaddress} />
                </div>
                <div className='text-end'>
                  <input type="button" className='btn-purple' value="Submit" onClick={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-5'>
            <img src={insurance} className='img-fluid border-purple' style={{height:"375px"}} />
          </div>
        </div>
        <div>
          <h3 className='heading mt-3'>Insurance Comapny Lists</h3>
          <div>
            <table className='table table-striped text-center'> 
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Company Phone Number</th>
                  <th>Company Email</th>
                  <th>Comapny Address</th>
                </tr>
              </thead>
              <tbody>
                {
                  companylst.map((item)=>{
                    return(
                      <tr>
                        <td>{item.companyname}</td>
                        <td>{item.companyphone}</td>
                        <td>{item.companyemail}</td>
                        <td>{item.companyaddress}</td>
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
