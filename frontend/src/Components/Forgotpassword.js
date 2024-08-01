import React, { useState } from 'react';
import './Info.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Forgotpassword() {

    const [email,setemail]=useState("");
    const [emailbool,setemailbool]=useState(false);

    const [otp,setotp]=useState();

    const navigate=useNavigate();

    function handleSubmit()
    {
        axios.get(`http://localhost:8080/chkEmail/${email}`)
        .then((res)=>{
            if(res.data==="Otp Sent your Email Please Check")
            {
                toast.success(res.data);
                setemailbool(true);
            }
            else
                setemailbool(false);
        })
    }

    function handleOk()
    {
        axios.get(`http://localhost:8080/chkOtp/${otp}`)
        .then((res)=>{
            if(res.data==="Entered Correct Otp")
            {
                sessionStorage.setItem('email',email);
                navigate("/newpassword");
                toast.success(res.data);
                setemailbool(false);
            }
            else
            {
                toast.error(res.data);
                setemailbool(false);
            }
        })
        clearAll()
    }

    function clearAll()
    {
        setotp("");
    }

  return (
    <>
        <div className='text-end'>
            <Link className="btn btn-warning me-4 mt-2 mb-4" to="/">Logout</Link>
        </div>
        <div className='container'>
            <h4 className='heading'>Forgot Password DashBoard</h4>
            <div className='card border-2 p-3'>
                <div>
                    <label className='form-label'>Enter the Email</label>
                    <input type='text' className='form-control border-2' onChange={(e)=>setemail(e.target.value)} value={email} />
                </div>
                <div className='text-end'>
                    <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                </div>
                {
                    emailbool?
                    (
                        <>
                            <div className='mt-3'>
                                <label className='form-label'>Enter the otp</label>
                                <input type="text" className='form-control' onChange={(e)=>setotp(e.target.value)} value={otp} />
                            </div>
                            <div>
                                <input type='button' className='btn-purple' value="ok" onClick={handleOk} />
                            </div>
                        </>
                    )
                    :
                    ("")
                }
            </div>
        </div>
    </>
  )
}
