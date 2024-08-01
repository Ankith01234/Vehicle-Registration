import React, { useState } from 'react';
import './Info.css';
import axios from 'axios';

export default function Viewownership() {

    const [vehno,setvehno]=useState("");
    const [vehbool,setvehbool]=useState(false);
    const [vehhistory,setvehhistory]=useState(false);
    const [vehmsg,setvehmsg]=useState("");

    const [vehlst,setvehlst]=useState([]);

    function handleSubmit()
    {
        setvehbool(true);
        axios.get(`http://localhost:8080/getVehOwner/${vehno}`)
        .then((res)=>{   
            console.log(res.data);    
            if(res.data==="This Vehicle is not registered" && typeof res.data==="string")
            {
                console.log(res.data);
                setvehmsg(res.data);
                setvehhistory(false);
            }
            else if(res.data.length==0 && typeof res.data==='object')
            {
                setvehmsg("This Vehicle Doesn't have any History");
                setvehhistory(false);
            }
            else
            {
                setvehlst(res.data);
                setvehhistory(true);
            }
        })
    }

    function handleClear()
    {
        setvehbool(false);
        setvehno("");
    }

  return (
    <div className='container'>
        <h4 className='heading'>Ownership</h4>
        <div className='card border-2 p-3 bg-light'>
            <div className='card border-2 p-3'>
                <div>
                    <div>
                        <label className='form-label'>Enter the Vehicle Number</label>
                        <input type='text' className='form-control border-2' placeholder='Search Vehicle' onChange={(e)=>setvehno(e.target.value)} value={vehno} />
                    </div>
                    <div className='text-end'>
                        <input type="button" className='btn-purple me-2' value="clear" onClick={handleClear} />
                        <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
        {
            vehbool?
            (
                <>
                    <h4 className='heading mt-4'>Vehicle History</h4>
                    <div className='card border-2 p-3 bg-light'>   
                        <div className='card border-2 p-3'>
                            {
                                vehhistory?
                                (
                                    <div>
                                        <table className='table table-striped text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Owner Name</th>
                                                    <th>Buyer Name</th>
                                                    <th>Tranfered Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vehlst.map((item)=>{
                                                        return(
                                                            <tr>
                                                                <td>{item.user.username}</td>
                                                                <td>{item.buyerid.buyername}</td>
                                                                <td>{item.transferdate}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                                    :
                                (
                                    <h6 className='text-center'>{vehmsg}</h6>
                                )
                            }
                        </div>
                    </div>
                </>
            )
            :
            ("")
        }
    </div>
  )
}
