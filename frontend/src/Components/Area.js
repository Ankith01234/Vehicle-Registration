import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import area from '../Area.jpg';

export default function Area() {

    const [areaname, setareaname] = useState("");

    const [arealst, setarealst] = useState([]);

    useEffect(() => {
        getAllArea();
    }, [])

    function handleSubmit()
    {

        if(!areaname)
        {
            toast.error("Enter the Area Name");
            return;   
        }

        const obj = { areaname };

        axios.post("http://localhost:8080/addArea", obj)
            .then((res) => {
                if (res.data === "Areaname Added Successfully") {
                    toast.success(res.data);
                    getAllArea();
                    clearAll();
                }
                else
                    toast.error(res.data);
            })
    }

    function getAllArea() {
        axios.get("http://localhost:8080/getAllArea")
            .then((res) => {
                setarealst(res.data);
            })
    }

    function clearAll() {
        setareaname("");
    }

    return (
        <div className='container'>
            {/* <h3 className='heading'>Area Details</h3> */}
            <div className='row mb-5'>
                <div className='col-6'>
                    <h3 className='heading mb-3'>Area Info</h3>
                    <div className='card border-2 p-3'>
                        <div>
                            <label className='form-label'>Enter the Area</label>
                            <input type='text' className='form-control border-2' onChange={(e) => setareaname(e.target.value)} value={areaname} />
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                    <div>
                        <h3 className='heading mt-4'>Area List</h3>
                        <table className='table table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Area ID</th>
                                    <th>Area Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arealst.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.areaid}</td>
                                                <td>{item.areaname}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='text-center mb-5 '>
                        <img src={area} alt="" className='img-fluid border-purple' style={{ height: "400px" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
