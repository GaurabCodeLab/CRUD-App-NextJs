"use client";
import { useState, useEffect} from 'react';
import Link from 'next/link';

function Read(){
const [data, setData] = useState([]);
const [dark, setDark] = useState(false);

useEffect(()=>{
  readData();
}, [])

function deleteData(id){
  fetch(`https://crud-app-next-js-eta.vercel.app/api/${id}`, {
    method : "DELETE"
  })
  .then((result)=>{
    if(result.ok){
      return result.json();
    } else {
      throw new Error("something went wrong");
    }
  })
  .then((response)=>{
    alert("Data Deleted Successfully");
    readData();
  })
  .catch((error)=>console.log(error))
}

function readData(){
  fetch("https://crud-app-next-js-eta.vercel.app/api")
  .then((result)=>{
    if(result.ok){
      return result.json()
    } else{
      throw new Error("something went wrong")
    }
  })
  .then((response)=>setData(response))
  .catch((error)=>console.log(error))
}

    return (
        <>
        <div className="mx-5 mt-3 primary"> 
        <div className="form-check form-switch">
    <input className="form-check-input" type="checkbox" role="switch" style={{cursor:"pointer"}} onClick={()=>setDark(!dark)} />
</div>
        <div className="d-flex justify-content-between mt-3">
        <h1>Read Operation</h1>
        <Link href="/"><button type="button" className="btn btn-info">Create</button></Link>
        </div>
        <table className={dark?"table table-striped table-dark" : "table table-striped table-light"}>
  <thead>
    <tr>
      <th scope="col">Serial No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Edit Operation</th>
      <th scope="col">Delete Operation</th>
    </tr>
  </thead>
  <tbody>
    {
      data.map((value, index)=>(
        <tr key={value._id}>
      <th scope="row">{index+1}</th>
      <td>{value.name}</td>
      <td>{value.email}</td>
      <td><Link href={`/update/${value._id}`}><button type="button" className="btn btn-success">Edit</button></Link></td>
      <td><button type="button" className="btn btn-danger" onClick={()=>deleteData(value._id)}>Delete</button></td>
    </tr>
      ))
    }
  </tbody>
</table>
</div>
</>
    
    )
}

export default Read;