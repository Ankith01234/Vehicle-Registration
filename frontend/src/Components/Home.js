import React, { useState } from 'react';
import './Info.css';
import photo1 from '../photo.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {

    const [userid,setuserid]=useState();
    const [password,setpassword]=useState("");

    const [val,setval]=useState();

    const [buyername,setbuyername]=useState("");
    const [buyerphone,setbuyerphone]=useState("");
    const [buyeremail,setbuyeremail]=useState("");
    const [buyeraddress,setbuyeraddress]=useState("");

    const navigate=useNavigate();

    // function handleAccount()
    // {

    //     if(val==1)
    //     {
    //         const obj={userid,password};

    //         axios.post("http://localhost:8080/addAdmin",obj)
    //         .then((res)=>{
    //             if(res.data==="Admin Data Saved in the Database")
    //                 toast.success(res.data);
    //         })
    //         .catch((error)=>{
    //             console.error("Error:",error);
    //         })  
    //     }
    //     else
    //         toast.error("You don't have permission to create account");

    //     clearAll(); 

    // }

    function clearAll()
    {
        setval("");
        setuserid("");
        setpassword("");
    }

    function handleLogin()
    {

        if(val==0)
        {
            toast.error("Please Select the User Type");
            return;
        }

        if(!userid)
        {
            toast.error("Please Enter the User ID");
            return;
        }

        if(!password)
        {
            toast.error("Please Enter the Password");
            return;
        }

        if(val==1)
        {
            const obj={userid,password};   

            axios.post("http://localhost:8080/verifyAdminLogin",obj)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    navigate("/admin");
                    toast.success("You Login Successfully");
                }
                else
                    toast.error(res.data);
            })
            .catch((error)=>{
                console.error("Error:",error);
            })

            clearAll();
        }
        else if(val==2)
        {
            sessionStorage.setItem('rtoid',userid);

            axios.get(`http://localhost:8080/chkRto/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    navigate("/rtoboard");
                    toast.success("You Login Successfully");
                }
                else
                    toast.error("Invalid Password");
            })

        }
        else if(val==3)
        {
            sessionStorage.setItem('stationid',userid);

            axios.get(`http://localhost:8080/chkStation/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    navigate("/stationboard");
                    toast.success("Login Successfully");   
                }
                else
                    toast.error("Invalid Password");
            })

        }
        else if(val==4)
        {
            sessionStorage.setItem('insuranceid',userid);

            axios.get(`http://localhost:8080/chkInsurance/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    navigate("/insurancedashboard");
                    toast.success("Login SuccessFully");
                }
                else
                    toast.error("Invalid Password");
            })

        }
        else if(val==5)
        {
            sessionStorage.setItem('buyerid',userid);
            
            axios.post(`http://localhost:8080/chkBuyer/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="Correct Password")
                {
                    toast.success("You Login Successfully");
                    navigate("/buyerdashboard");   
                }
                else
                    toast.error(res.data);
            })

        }

    }

    function handleSignUp()
    {
        const obj={buyername,buyerphone,buyeremail,buyeraddress};

        axios.post("http://localhost:8080/addBuyer",obj)
        .then((res)=>{
            if(res.data==="Buyer account Registered Successfully")
                toast.success(res.data);
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function clearAll()
    {
        setbuyername("");
        setbuyerphone("");
        setbuyeremail("");
        setbuyeraddress("");
    }

    return (
        <div className='container'>
            <h3 className='heading mb-4 mt-3'>Vehicle Registraion</h3>        
            <div className='row align-items-center '>
                <div className='col-6'>
                    <img src={photo1} alt="" className='img-fluid border-purple' style={{height:"450px",width:"550px"}}/>
                </div>
                <div className='col-6'>
                    <div className='card border-2 p-3'>
                        <div>
                            <label className='form-label'>Select User Type</label>
                            <select className='form-select border-2' onChange={(e)=>setval(e.target.value)} value={val}>
                                <option value={0}>--Select--</option>
                                <option value={1}>Admin</option>
                                <option value={2}>RTO</option>
                                <option value={3}>Police Station</option>
                                <option value={4}>Insurance</option>
                                <option value={5}>Buyer</option>
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the User-ID</label>
                            <input type='text' className='form-control border-2' onChange={(e)=>setuserid(e.target.value)} value={userid} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Enter the Password</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setpassword(e.target.value)} value={password} />
                        </div>
                        <div className='text-end'>
                            <Link type='button' className='btn btn-light me-2' to="forgotpassword" >forgot password</Link>
                            <button className='btn-purple me-2' type='button' data-bs-toggle="modal" data-bs-target="#Modal" >
                                Buyer Registration
                            </button>
                            <div className='modal fade' id="Modal">
                                <div className='modal-dialog'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h3 style={{color:' rgb(148, 67, 148)'}}>Buyer Sign-Up</h3>
                                            <button className='btn-close' data-bs-dismiss='modal'></button>
                                        </div>
                                        <div className='modal-body'>
                                            <div className='text-start'>
                                                <label className='form-label'>Buyer Name</label>
                                                <input type='text' className='form-control border-2' onChange={(e)=>setbuyername(e.target.value)} value={buyername} />
                                            </div>
                                            <div className='text-start'>
                                                <label className='form-label'>Buyer Phone</label>
                                                <input type='text' className='form-control border-2' onChange={(e)=>setbuyerphone(e.target.value)} value={buyerphone} />
                                            </div>
                                            <div className='text-start'>
                                                <label className='form-label'>Buyer Email</label>
                                                <input type='text' className='form-control border-2' onChange={(e)=>setbuyeremail(e.target.value)} value={buyeremail} />
                                            </div>
                                            <div className='text-start'>
                                                <label className='form-label'>Buyer address</label>
                                                <input type='text' className='form-control border-2' onChange={(e)=>setbuyeraddress(e.target.value)} value={buyeraddress} />
                                            </div>
                                        </div>
                                        <div className='modal-footer'>
                                            <input type='button' className='btn-purple' value='Sign-Up' data-bs-dismiss='modal' onClick={handleSignUp} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type='button' className='btn-purple' value="Login" onClick={handleLogin} />                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <p className='para-border'>Vehicle registration is a legal requirement in most countries, involving the registration of a vehicle with government transportation authorities. It provides a unique identification for each vehicle, usually in the form of a license plate number. This registration serves as proof of ownership and helps authorities track and identify vehicles. Registering a vehicle typically requires documentation such as proof of ownership (like a title or bill of sale), identification (such as a driver's license), and sometimes proof of insurance. Some jurisdictions also require vehicles to undergo inspection to ensure they meet safety and emissions standards before registration. Fees and taxes are often associated with vehicle registration, including registration fees, title fees, and taxes based on vehicle value or emissions. Registration is usually valid for a specific period and must be renewed periodically, requiring payment of fees and updating of information. When a vehicle changes ownership, registration must be transferred to the new owner, involving completing forms and paying transfer fees. Failure to register a vehicle or keep registration up-to-date can result in penalties or fines. Many jurisdictions offer online registration services for convenience. Different types of vehicles may have specific registration requirements or classifications. Understanding vehicle registration requirements is essential for vehicle owners to comply with the law and maintain their vehicles in good standing with regulatory authorities.</p>
            </div>
        </div>
    )
}
