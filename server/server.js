const express = require('express');
const app = express();
const cors= require('cors');
const path= require('path');
const pool= require('./db');
require('dotenv').config();
const port= process.env.PORT||5000;

//middleware
app.use(express.json());
app.use(cors());


//Environment

if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname, '..', 'client/build')));
    
}



//get all todos

app.get("/todos", (req,res)=>{

    const alltodos= "SELECT * FROM todo"
    
    pool.query(alltodos, (err, response)=>{
if(err){console.log(err)};
res.json(response.rows);

    });

})

//Get single todo

app.get("/todos/:id", async (req,res)=>{

    try{
    
    const {id}= await req.params;

    const alltodos= await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(alltodos.rows)

 ;

}catch(err){
    console.log(err)
}


})

//Update single todo
app.put("/todos/:id", async (req,res)=>{

    try{
    
    const {id}= await req.params;
    const {description}= await req.body

    const updateToDo= await pool.query("UPDATE todo SET description=$1 WHERE todo_id= $2 RETURNING *", [description, id]);
    res.json(updateToDo.rows[0])

 ;

}catch(err){
    console.log(err)
}


})

//delete
app.delete("/todos/:id", async (req,res)=>{

    try{
    
    const {id}= await req.params;
    const {description}= await req.body

    const deleteToDo= await pool.query("DELETE FROM todo WHERE todo_id= $1 RETURNING *", [ id]);
    res.json("Todo was deleted")

 ;

}catch(err){
    console.log(err)
}


})


//Create todo

app.post("/addtodo", async (req, res)=>{
    try{
        console.log(req.body)
    const {description}=req.body;
    const newTodo= await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

    
    res.json(newTodo.rows[0])
    }catch(err){
console.log(message.err);
  }

})



app.listen(port, ()=>{
    console.log(`port listening on port ${port}`)
})