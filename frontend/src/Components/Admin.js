import React from 'react';
import './Info.css';
import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
    return (
        <>
            <div className='text-end me-4 mb-3 mt-3'>
                <Link to="/" className='btn btn-warning'>LogOut</Link>
            </div>
            <div className='container'>
                <nav class="navbar navbar-expand-lg bg-purple mb-3">
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="">Admin DashBoard</a>
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="area" className='nav-link text-light'>Area</Link>
                        </li>                       
                        <li className='nav-item'>
                            <Link to="rto" className='nav-link text-light'>RTO</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="policestation" className='nav-link text-light'>PoliceStation</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="insurance" className='nav-link text-light'>Insurance</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>

    )
}
