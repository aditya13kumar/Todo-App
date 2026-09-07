import express from 'express';
import { todomodel } from '../Model/todomodel.js';


const routes = express.Router();

routes.get("/", async(req,res)=>{
    try {
        const todo =await todomodel.find();
        res.json(todo);
    } catch (error) {
        res.status(500).json({message: err.message});
    }
})

// Create a new todo
routes.post("/",async(req,res)=>{
    const todo = new todomodel({
        text:req.body.text
    })
    try {
        const newTodo =await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

// update a todo 
routes.patch("/:id",async(req,res)=>{
    try {
        const todo = await todomodel.findById(req.params.id);
        if(!todo)return res.status(404).json({message:"tod not found"});

        if (req.body.text !== undefined){
            todo.text = req.body.text;
        }

        if(req.body.completed !== undefined){
            todo.completed = req.body.completed
        }

        const updatedtodo = await todo.save()
        res.json(updatedtodo);

    } catch (error) {
        res.status(404).json({message:err.message})
    }
})

// deleted todo
routes.delete("/:id",async(req,res)=>{
    try {
        await todomodel.findByIdAndDelete(req.params.id);
        res.json({message:"todo deleted"})
    } catch (error) {
        res.status(404).json({message:err.message})
    }
})
export default routes;