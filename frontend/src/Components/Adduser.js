import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import Userform from '../Userform.jpg';
import { toast } from 'react-toastify';

export default function Adduser() {

    const [rtoid, setrtoid] = useState("");
    const [username, setusername] = useState("");
    const [userphone, setuserphone] = useState("");
    const [useremail, setuseremail] = useState("");
    const [address, setaddress] = useState("");

    const [userlst, setuserlst] = useState([]);

    useEffect(() => {
        getId();
        getAllUser();
    }, [])

    function getId() {
        var id = sessionStorage.getItem('rtoid');
        setrtoid(id);
    }

    function handleSubmit() 
    {

        if(!username)
        {
            toast.error("Please Enter the Username");
            return;   
        }

        if(!userphone)
        {
            toast.error("Please Enter the Userphone");
            return;   
        }

        if(!useremail)
        {
            toast.error("Enter the User Email");
            return;   
        }

        if(!address)
        {
            toast.error("Please Enter the User Address");
            return;   
        }

        const obj = { username, userphone, useremail, address };

        var rtoid = sessionStorage.getItem('rtoid');

        axios.post(`http://localhost:8080/addUser/${rtoid}`, obj)
            .then((res) => {
                if (res.data === "User Data Added Successfully") {
                    toast.success(res.data);
                    getAllUser();
                }
                else
                    toast.error(res.data);
            })

        clearAll();

    }

    function getAllUser() {
        var id = sessionStorage.getItem('rtoid');

        axios.get(`http://localhost:8080/getParticularUser/${id}`)
            .then((res) => {
                setuserlst(res.data);
            })
    }

    function clearAll() {
        setusername("");
        setuseremail("");
        setuserphone("");
        setaddress("");
    }

    return (
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-5'>
                <h3 className='heading'>User Details</h3>
                    <div className='card border-2 p-3'>
                        <div>
                            <div>
                                <label className='form-label'>Your ID</label>
                                <input type='text' className='form-control border-2' value={rtoid} />
                            </div>
                            <div>
                                <label className='form-label'>User Name</label>
                                <input type="text" className='form-control border-2' onChange={(e) => setusername(e.target.value)} value={username} />
                            </div>
                            <div>
                                <label className='form-label'>User Phone</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setuserphone(e.target.value)} value={userphone} />
                            </div>
                            <div>
                                <label className='form-label'>User Email</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setuseremail(e.target.value)} value={useremail} />
                            </div>
                            <div>
                                <label className='form-label'>User Address</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setaddress(e.target.value)} value={address} />
                            </div>
                            <div className='mt-2 text-end'>
                                <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-7'>
                    <div>
                        <h3 className='heading'>User Details Lists</h3>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>User Phone</th>
                                    <th>User Email</th>
                                    <th>User Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userlst.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.username}</td>
                                                <td>{item.userphone}</td>
                                                <td>{item.useremail}</td>
                                                <td>{item.address}</td>                                            
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
