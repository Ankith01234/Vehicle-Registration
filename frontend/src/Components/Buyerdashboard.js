import React from 'react';
import './Info.css';
import { Link, Outlet } from 'react-router-dom';

export default function Buyerdashboard() {

    function handleLogout()
    {
        sessionStorage.removeItem('buyerid');
    }

    return (
        <>
            <div className='text-end mb-3 mt-2 me-5'>
                <Link className='btn btn-warning' to="/" onClick={handleLogout}>Logout</Link>
            </div>
            <div className='container'>
                <nav class="navbar navbar-expand-lg bg-purple mb-3">
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="">Buyer DashBoard</a>
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to="buyersearch" className='nav-link text-light'>Vehicle_Search</Link>
                        </li>                       
                        <li className='nav-item'>
                            <Link to="buyerdocument" className='nav-link text-light'>Document_Upload</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="buyertransfer" className='nav-link text-light'>Transfer</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="buyerview" className='nav-link text-light'>View_Ownership</Link>
                        </li>                    
                    </ul>
                </nav>
                <Outlet />                           
            </div>
        </>
    )
}
