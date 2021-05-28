import React, { Fragment, useState } from 'react';
import axios from 'axios';

const InputTodo=()=>{
  const [description, setDescription]= useState("")

const addDescription=()=>{
// e.preventDefault();
  axios.post("/addtodo",{description:description}).then((response)=>{return response.data}).then((response)=>{console.log(response)})

setDescription("");

}

    return <Fragment>
    <h1 className="text-center mt-5"> Pern Todo List</h1>
     <form className="d-flex mt-5" onSubmit={addDescription}>
  
    <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)}/>
    
      <button type="submit" className="btn btn-success" >Add</button>
    
    </form>
    </Fragment>

}

export default InputTodo;