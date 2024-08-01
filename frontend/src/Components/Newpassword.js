import React, { useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Newpassword() {

    const [newpassword,setnewpassword]=useState();
    const [confirmpass,setconfirmpass]=useState();

    const navigate=useNavigate();

    function handleSubmit()
    {
        if(newpassword==confirmpass)
        {
            var emailid=sessionStorage.getItem('email');

            axios.put(`http://localhost:8080/updateGmail/${emailid}/${newpassword}`)
            .then((res)=>{
                toast.success(res.data);
                navigate("/");
                sessionStorage.removeItem('email');
            })

        }
        else
          toast.error("Password Mismatch");
    }

  return (
    <div className='container'>
        <h4 className='heading'>NewPassord Dashboard</h4>
        <div className='card border-2 p-3'>
          <div>
            <div>
              <label className='form-label'>Enter the Password</label>
              <input type="text" className='form-control border-2' onChange={(e)=>setnewpassword(e.target.value)} value={newpassword} />
            </div>
            <div className='mt-2'>
              <label className='form-label'>Enter the Confirm Password</label>
              <input type='password' className='form-control border-2' onChange={(e)=>setconfirmpass(e.target.value)} value={confirmpass} />
            </div>
            <div className='text-end'>
              <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
    </div>
  )
}
