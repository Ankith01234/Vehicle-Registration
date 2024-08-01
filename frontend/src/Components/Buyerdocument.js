import React, { useEffect, useState } from 'react';
import './Info.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Buyerdocument() {

    const [filename,setfilename]=useState("");
    const [filepath,setfilepath]=useState("");
    const [filebool,setfilebool]=useState(false);

    const [filemsg,setfilemsg]=useState("You Have not uploaded any Files");

    const [fileslst,setfileslst]=useState([]);

    useEffect(()=>{
        getUploadFile();
    },[])

    const Image=(e)=>{
        let file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setfilepath(reader.result);
        };
    };

    function getUploadFile()
    {

        var id=sessionStorage.getItem('buyerid');

        axios.get(`http://localhost:8080/getAllUploadFile/${id}`)
        .then((res)=>{
        debugger;
            if(res.data.length==0)
            {
                setfilebool(false);            
                setfilemsg("You Have not uploaded any Files");
                setfileslst("");
            }
            else if(typeof res.data==='object')
            {            
                setfileslst(res.data);
                setfilebool(true);
                setfilemsg("");
            }
            else
            {            
                setfilebool(false);
                setfilemsg(res.data);
                setfileslst("");
            }
        })

    }

    function handleSubmit()
    {
        const obj={filename,filepath};

        var id=sessionStorage.getItem('buyerid');

        axios.post(`http://localhost:8080/uploadDocument/${id}`,obj)
        .then((res)=>{
            if(res.data==="Documents Uploaded successfully")
            {
                toast.success(res.data);
                getUploadFile();
            }
            else
                toast.error(res.data);
        })

        clearAll();
    }

    function clearAll()
    {
        setfilename("");
        setfilepath("");
    }

    function handleDelete(id)
    {
        debugger;
        axios.put(`http://localhost:8080/deactiveDocument/${id}`)
        .then((res)=>{
            if(res.data==="Deleted Successfully")
            {
                toast.success(res.data);
                getUploadFile();
            }
            else
                toast.error(res.data);
        })
    }

  return (
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-6'>
            <h3 className='heading'>Upload Document</h3>
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Enter the File Name</label>
                            <input type="text" className='form-control border-2' onChange={(e)=>setfilename(e.target.value)} value={filename} />
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the File</label>
                            <input type="file" className='form-control border-2' onChange={Image} />
                        </div>
                        <div className='text-end'>
                            <input type='button' className='btn-purple' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <h3 className='heading'>Files Lists</h3>
                {
                    filebool?
                    (
                        <>                        
                            <div className='card border-2 p-3'>
                                <table className='table text-center'>
                                <thead>
                                    <tr>
                                        <th>File Name</th>
                                        <th>Upload Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fileslst.map((item)=>{
                                            return(
                                                <tr>
                                                    <td>{item.filename}</td>
                                                    <td>{item.uploaddate}</td>
                                                    <td><input type='button' className='btn btn-danger' value="Delete" onClick={(e)=>{handleDelete(item.fileid)}} /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>
                        </>
                    )
                    :
                    (
                        <h6 className='text-center'>{filemsg}</h6>
                    )
                }
            </div>
        </div>
    </div>
  )
}
