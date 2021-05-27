import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import EditTodo from './editTodo';


const ListTodo=()=>{
   const [todos, setTodos]= useState([]);

    //delete function
    const deleteTodo=(id)=>{

        axios.delete(`http://localhost:5000/todos/${id}`).then(()=>{
        setTodos(todos.filter((todo)=> todo.todo_id!==id))

        })

    }
   
   
   // get function 
   const getTodos= ()=> {

    axios.get("http://localhost:5000/todos").then((response)=>{return response.data}).then((data)=>setTodos(data))

    }

    //When window loads (similar to component did mount)
useEffect(()=>{

    getTodos();


}, [])

console.log(todos)

    return(
        <Fragment>
        <h1>
        List Todos </h1>
        <table className="table mt-5 text-center">
        <thead>
  <tr>
    <th>Description</th>
    <th>Edit</th> 
    <th>Delete</th>
  </tr>
  </thead>
  <tbody>
  {/*<tr>
    <td>Description</td>
    <td>Edit</td> 
    <td>Delete</td>
  </tr>*/}
  {todos.map((todo)=>(<tr key={todo.todo_id}>
    <td>{todo.description}</td>
    <td><EditTodo todo={todo}/></td> 
    <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
  </tr>))}
  </tbody>
</table>
        </Fragment>)

    }


export default ListTodo;