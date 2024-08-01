import React, { useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Buyersearch() {

    const [vehno, setvehno] = useState("");
    const [val, setval] = useState(false);
    const [insuranceMsg, setinsuranceMsg] = useState("");
    const [insurancebool, setinsurancebool] = useState();
    const [crimemsg, setcrimemsg] = useState("");
    const [crimebool, setcrimebool] = useState(false);

    const [userdetailslst, setuserdetailslst] = useState([]);
    const [uservehlst, setuservehlst] = useState({});
    const [vehInsuranceLst, setvehInsuranceLst] = useState({});
    const [vehCrimelst, setvehCrimelst] = useState([]);

    function handleSearch() {

        if (!vehno) {
            toast.error("Please Enter the Vehicle Number");
            return;
        }

        axios.get(`http://localhost:8080/getUserDetails/${vehno}`)
            .then((res) => {
                if (typeof res.data === 'object') {
                    setval(true);
                    setuserdetailslst(res.data);
                }
                else {
                    toast.error(res.data);
                    setval(false);
                    return;
                }

                axios.get(`http://localhost:8080/getUserVehDetails/${vehno}`)
                    .then((res) => {
                        if (typeof res.data === 'object')
                            setuservehlst(res.data);
                        else {
                            toast.error(res.data);
                            setval(false);
                            return;
                        }

                        axios.get(`http://localhost:8080/getVehInsurance/${vehno}`)
                            .then((res) => {
                                setinsurancebool(0);
                                if (typeof res.data === 'object') {
                                    console.log(res.data);
                                    setvehInsuranceLst(res.data);
                                    setinsurancebool(1);
                                }
                                else {
                                    setinsuranceMsg(res.data);
                                    setinsurancebool(0);
                                }

                                axios.get(`http://localhost:8080/getVehCrime/${vehno}`)
                                    .then((res) => {
                                        if (typeof res.data === 'object') {
                                            setvehCrimelst(res.data);
                                            setcrimebool(true);
                                        }
                                        else {
                                            setcrimemsg(res.data);
                                            setcrimebool(false);
                                        }
                                    })
                            })
                    })
            })
    }

    function handleClear() {
        setval(false);
        setvehno("");
        setuserdetailslst("");
    }

    return (
        <div className='container'>
            <div className='card border-2 p-3 bg-light '>
                <div>
                    <div className='card border-2 p-3'>
                        <div>
                            <div className='text-center'>
                                <label className='form-label'>Enter the Vehicle Number</label>
                                <input type='search' className='form-control border-2' placeholder="Search" onChange={(e) => setvehno(e.target.value)} value={vehno} />
                            </div>
                            <div className='text-end'>
                                <input type='button' className='btn-purple me-2' value='clear' onClick={handleClear} />
                                <input type='button' className='btn-purple' value="Submit" onClick={handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                val &&
                <>
                    <h3 className='heading mt-5 mb-3'>Vehicle Details</h3>
                    <div>
                        <div className='card border-2 p-3 bg-light mb-5'>
                            <div>
                                <div className='card border-2 p-3'>
                                    <h5 className='heading'>User Details</h5>
                                    <div className='card border-2 p-3'>
                                        <table className='table table-striped text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Address</th>
                                                    <th>Vehicle Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userdetailslst.map((item) => {
                                                        return (
                                                            <tr>
                                                                <td>{item[0]}</td>
                                                                <td>{item[1]}</td>
                                                                <td>{item[2]}</td>
                                                                <td>{item[3]}</td>
                                                                <td>{item[4]}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className='heading mt-2'>Vehicle Details</h5>
                                    <div className='card border-2 p-3'>
                                        <table className='table table-striped text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Vehicle Name</th>
                                                    <th>Vehicle Type</th>
                                                    <th>Vehicle Company</th>
                                                    <th>Vehicle Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{uservehlst.vehiclename}</td>
                                                    <td>{uservehlst.vehicletype}</td>
                                                    <td>{uservehlst.vehiclecompany}</td>
                                                    <td>{uservehlst.vehiclenumber}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className='heading mt-2'>Vehicle Insurance Details</h5>
                                    <div className='card border-2 p-3'>
                                        {
                                            insurancebool == 1 ? (
                                                <table className='table table-striped text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>Insurance Company</th>
                                                            <th>Start Date</th>
                                                            <th>Endate</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {/* <td>{vehInsuranceLst.insurnce.companyname}</td> */}
                                                            <td>{vehInsuranceLst.insurance.companyname}</td>
                                                            <td>{vehInsuranceLst.startdate}</td>
                                                            <td>{vehInsuranceLst.enddate}</td>
                                                            <td>{vehInsuranceLst.amount}</td>
                                                            <td>{vehInsuranceLst.status}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            ) :
                                            (
                                                <h6 className='text-center'>{insuranceMsg}</h6>
                                            )
                                        }
                                    </div>
                                    <h5 className='heading mt-2'>Police Crime Details</h5>
                                    <div className='card border-2 p-3'>
                                        {
                                            crimebool ? (
                                                <table className='table table-striped text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>Crime Type Name</th>
                                                            <th>Crime Name</th>
                                                            <th>Crime Description</th>
                                                            <th>Crime Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            vehCrimelst.map((item) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{item[0]}</td>
                                                                        <td>{item[1]}</td>
                                                                        <td>{item[2]}</td>
                                                                        <td>{item[3]}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            )
                                            :
                                            (
                                                <h6 className='text-center'>{crimemsg}</h6>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
