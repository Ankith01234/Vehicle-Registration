import React, { useEffect, useState } from 'react';
import './Info.css';
import { Link, Outlet } from 'react-router-dom';

export default function Policestationboard() {

    const [stationid, setstationid] = useState();

    // useEffect(() => {
    //     getStationId();
    // }, [])

    // function getStationId() {
    //     var id = sessionStorage.getItem('stationid');

    //     setstationid(id);
    // }

    function handleLogout()
    {
        sessionStorage.removeItem('stationid');
    }

    return (
        <>
            <div className='text-end me-4 mb-1 mt-3'>
                <Link to="/" className='btn btn-warning' onClick={handleLogout}>LogOut</Link>
            </div>
            <div className='container'>
                <nav class="navbar navbar-expand-lg bg-purple mb-3">
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="">Police Station DashBoard</a>
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="crimetype" className='nav-link text-light'> Add_Crime_Type</Link>
                        </li>                       
                        <li className='nav-item'>
                            <Link to="crimeadd" className='nav-link text-light'>Add_Crime</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="crimevehicle" className='nav-link text-light'>Crime_Vehicle</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="search" className='nav-link text-light'>Search</Link>
                        </li>
                    </ul>
                </nav>   
                <Outlet/> 
            </div>
        </>
    )
}
