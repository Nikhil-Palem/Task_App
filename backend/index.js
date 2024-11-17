
import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
import cors from 'cors';
const app=express();
const port=5000;
dotenv.config();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const db = new pg.Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});
db.connect();

app.post('/tasks',async(req,res)=>{
  const {title,description,due_date,status}=req.body;
  console.log(title,description);
  try{
    const result= await db.query('insert into tasks(title,description,due_date,status) values($1,$2,$3,$4) RETURNING *',[title,description,due_date,status]);
    console.log(result);
    res.status(201).json({
      message: 'Task created successfully',
      Task: result.rows[0], 
    });

  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/getTasks',async(req,res)=>{
  try{
    const result=await db.query("select * from tasks");
    res.json({Tasks:result.rows});
  }catch(error){
    console.log("db  retrieving error",error);
  }
})

app.get('/tasks/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const result=await db.query("select * from tasks where id=$1",[id]);
    if(result.rows.length===0){
      res.json('no rows exits');
    }else{
      res.json({Task:result.rows[0]});
    }
  }catch(error){
    console.log('failed to retrieve task',error);
  }
})

app.put('/update/:id',async(req,res)=>{
  const {id}=req.params;
  console.log(id);
  const { title, description, due_date, status } = req.body;
  try{
    const result=await db.query("update tasks set title=$1 ,description=$2 ,due_date=$3 ,status=$4 where id=$5 Returning *",[title, description, due_date, status,id]);
    if(result.rowCount===0){
      console.log("rows not found");
    }else{
      res.status(200).json({success:"successfully updated task"})  
    }
  }catch(error){
    console.log('error while updating to db',error);
  }
})

app.delete('/delete/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const result=await db.query("delete from tasks where id=$1 Returning *",[id]);
    if(result.rowCount===0){
      console.log('row not found');
    }else{
      res.status(200).json({success:"successfully deleted task"});   
    }
  }catch(error){
    console.log('internal server error',error);
  }
})

app.patch('/complete/:id',async(req,res)=>{
  const {id}=req.params;
  const {complete}=req.body;
  try{
      const result=await db.query('update tasks set status=$1 where id=$2',[complete,id]);
      if(result.rowCount===0){
        res.json('row not found');
        }else{
          res.status(201).json('successfully patched');
        }
  }catch(error){
    res.status(500).json({error:'internal server error'});
  }
})

app.listen(port,()=>{
  console.log(`server running on port${port}`);
})