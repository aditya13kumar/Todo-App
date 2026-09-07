import mongoose, { model, Schema } from 'mongoose';

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false 
    }
},{timestamps:true});


export const todomodel = mongoose.model("todo",todoSchema);

