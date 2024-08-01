import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Transfervehicle() {

    const [vehlst,setvehlst]=useState([]);
    const [vehrtolst,setvehrtolst]=useState({});
    const [buyerlst,setbuyerlst]=useState({});
    const [uploadfilelst,setuploadfilelst]=useState([]);
    const [uploadmsg,setuploadmsg]=useState("");

    const [uploadbool,setuploadbool]=useState(false);

    //const [buyerid,setbuyerid]=useState();

    useEffect(()=>{
        getTransferedVehlst();
    },[])

    function getTransferedVehlst()
    {

        var id=sessionStorage.getItem('rtoid');

        axios.get(`http://localhost:8080/getTransferVehLists/${id}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setvehlst(res.data);
            else
                toast.error(res.data);
        })

    }

    function handleVehicle(vehno)
    {
        axios.get(`http://localhost:8080/getVehDetailsToRto/${vehno}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setvehrtolst(res.data);
            else
                toast.error(res.data);
        })
    }

    function handleBuyer(buyername)
    {
        axios.get(`http://localhost:8080/getBuyerDetailsToRto/${buyername}`)
        .then((res)=>{
            if(typeof res.data==='object')
                setbuyerlst(res.data);  
            else
                toast.error(res.data);
        })


        axios.get(`http://localhost:8080/getBuyerUpload/${buyername}`)
        .then((res)=>{
            if(res.data.length==0)
            {
                setuploadfilelst("");
                setuploadbool(false);
                setuploadmsg("Not uploaded any files");   
            }
            else if(typeof res.data==='object')
            {
                setuploadfilelst(res.data);
                setuploadbool(true);
            }
            else
            {
                setuploadmsg(res.data);
                setuploadfilelst("");
                setuploadbool(false);
            }

        })

    }

    function handleTransferOwner(vehno,buyername)
    {
        axios.post(`http://localhost:8080/transferOwnership/${vehno}/${buyername}`)
        .then((res)=>{
            if(res.data==="Vehicle Transfered Successfully")
                toast.success(res.data);
            else
            {
                toast.error(res.data);
                return;
            }

            axios.post(`http://localhost:8080/addBuyerToUser/${buyername}/${vehno}`)
            .then((res)=>{
                if(res.data==="Buyer Details added to adduser Successfully")
                    toast.success(res.data);
                else
                {
                    toast.error(res.data);
                    return;
                }

                axios.put(`http://localhost:8080/setBuyeridToUserid/${buyername}/${vehno}`)
                .then((res)=>{
                    if(res.data==="Vehicle Transered from User to Buyer")
                        toast.success(res.data);
                    else
                    {
                        toast.error(res.data);
                        return;
                    }

                    axios.put(`http://localhost:8080/updateTransferVeh/${vehno}`)
                    .then((res)=>{
                        if(res.data==="Transfer Vehicle Update")
                        {
                            toast.success(res.data);
                            getTransferedVehlst();
                        }
                        else
                            toast.error(res.data);
                    })

                })

            })

        })
    }

  return (
    <div className='container'>
        <h4 className='heading'>Transfer Vehicle Dashboard Lists</h4>
        <div className='card border-2 p-3 bg-light'>            
            <div>
                {
                    vehlst.map((item)=>{
                        return(
                            <div className='card border-2 p-3 mb-2'>
                                <table className='table table-striped text-center'>
                                    <thead>
                                        <tr>
                                            <th>Buyer Name</th>
                                            <th>Vehicle Number</th>
                                            <th>Register Date</th>        
                                            <th></th>
                                            <th></th>                
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item[2]}</td>
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                            <td>
                                                <button type="button" className='btn btn-success' data-bs-toggle="modal" data-bs-target="#vehicledetails" onClick={(e)=>(handleVehicle(item[0]))} > 
                                                    VehicleDetails
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" className='btn btn-success' data-bs-toggle="modal" data-bs-target="#userdetails" onClick={(e)=>(handleVehicle(item[0]))}>
                                                    Owner Details
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" className='btn btn-success' data-bs-toggle="modal" data-bs-target="#buyerdetails" onClick={(e)=>handleBuyer(item[2])}>
                                                    Buyer Details
                                                </button>
                                            </td>
                                            <td>
                                                <button className='btn btn-dark' onClick={(e)=>(handleTransferOwner(item[0],item[2]))} >
                                                    Transfer Vehicle Ownership
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='modal fade' id="vehicledetails">
                                    <div className='modal-dialog'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h4 style={{color:'rgb(148, 67, 148)'}}>Vehicle Details</h4>
                                                <button className='btn-close' data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className='modal-body'>
                                                <table className='table table-striped text-center'> 
                                                    <thead>
                                                        <tr>
                                                            <th>Vehicle Number</th>
                                                            <th>Vehicle Company</th>
                                                            <th>Vehicle Name</th>
                                                            <th>Vehicle Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{vehrtolst.vehiclenumber}</td>
                                                            <td>{vehrtolst.vehiclecompany}</td>
                                                            <td>{vehrtolst.vehiclename}</td>
                                                            <td>{vehrtolst.vehicletype}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal fade' id="userdetails">
                                    <div className='modal-dialog'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h3 style={{color:'rgb(148, 67, 148)'}}>Owner Details</h3>
                                                <button type="button" className='btn-close' data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className='modal-body'>
                                                <table className='table table-striped text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>User Name</th>
                                                            <th>User Email</th>
                                                            <th>User Phone</th>
                                                            <th>User Address</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{vehrtolst.adduser?.username}</td>
                                                            <td>{vehrtolst.adduser?.useremail}</td>
                                                            <td>{vehrtolst.adduser?.userphone}</td>
                                                            <td>{vehrtolst.adduser?.address}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal fade' id="buyerdetails">
                                    <div className='modal-dialog'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h3 style={{color:'rgb(148, 67, 148)'}}>Buyer Details</h3>
                                                <button type="button" className='btn-close' data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className='modal-body'>
                                                <table className='table table-striped text-center'>
                                                    <thead>
                                                        <tr>
                                                            <th>Owner Name</th>
                                                            <th>Owner Email</th>
                                                            <th>Owner Phone</th>
                                                            <th>Owner Address</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            <tr>
                                                                <td>{buyerlst.buyername}</td>
                                                                <td>{buyerlst.buyeremail}</td>
                                                                <td>{buyerlst.buyerphone}</td>
                                                                <td>{buyerlst.buyeraddress}</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {
                                                uploadbool?
                                                (
                                                    <div className='modal-footer'>                                                        
                                                            <p>Download files</p>                                                        
                                                        {
                                                            uploadfilelst.map((item)=>{
                                                                return(
                                                                    <a href={item.filepath} download>{item.filename}</a>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                                :
                                                (
                                                    <h6 className='text-center'>{uploadmsg}</h6>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
