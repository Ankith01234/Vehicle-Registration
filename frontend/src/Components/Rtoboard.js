import React, { useEffect, useState } from 'react';
import './Info.css';
import { Link, Outlet } from 'react-router-dom';

export default function Rtoboard() {

    const [rtoid,setrtoid]=useState();

    useEffect(()=>{
        getId();
    },[])

    function getId()
    {
        var id=sessionStorage.getItem('rtoid');

        setrtoid(id);
    }

    function handleLogout()
    {
        sessionStorage.removeItem('rtoid');
    }

    return (
        <>
            <div className='text-end me-4 mb-1 mt-3'>
                <Link to="/" className='btn btn-warning' onClick={handleLogout}>LogOut</Link>
            </div>
            <div className='container'>
                <nav class="navbar navbar-expand-lg bg-purple mb-3">
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="">RTO DashBoard</a>
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="adduser" className='nav-link text-light'>Add_User</Link>
                        </li>                       
                        <li className='nav-item'>
                            <Link to="addvehicle" className='nav-link text-light'>Add_Vehicle</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="transfervehicle" className='nav-link text-light'>Transfer_vehicle</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="viewownership" className='nav-link text-light'>View_Ownership</Link>
                        </li>
                        <li className='nav-item'> 
                            <Link to="rtosearch" className='nav-link text-light'>Search</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
}
