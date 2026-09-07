import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";

import axios from 'axios';

function App() {
  const [newtodo, setnewtodo] = useState("");
  const [todo , settodo] = useState([]);
  const [edittodo , setedittodo] = useState(null);
  const [edittext , setedittext] = useState("");

  const addtodo = async(e)=>{
    e.preventDefault();
    if(!newtodo.trim()) return;

    try {
      const res = await axios.post('/api/todo',{text:newtodo});
      settodo([...todo , res.data]);
      setnewtodo('');
    } catch (error) {
      console.log("Error adding todo:",error);
    }
  }

  const fetchtodo = async()=>{
    try {
      const response = await axios.get("/api/todo");
      settodo(response.data);
    } catch (error) {
      console.log("error:",error);
    }
  }

  useEffect(()=>{
    fetchtodo();
  },[]);

  const editing = (todos)=>{
    setedittodo(todos._id);
    setedittext(todos.text);

  }

  const saveedit = async(id)=>{
    try {
      const res = await axios.patch(`/api/todo/${id}`,{text:edittext});
      settodo(todo.map((todo)=>(todo._id === id ? res.data:todo)));
      setedittodo(null);
      setedittext("");
    } catch (error) {
      console.log("err:",error)
    }
  }

  const deletetodo = async(id)=>{
    try {
      await axios.delete(`/api/todo/${id}`);
      settodo(todo.filter((todos)=> todos._id !== id));
    } catch (error) {
      console.log("error deleted:",error);
    }
  }

  const toggletodo = async(id)=>{
    try {
      const togle = todo.find((t)=> t._id === id);
      const response = await axios.patch(`/api/todo/${id}`,{completed :!togle.completed})
      settodo(todo.map((t)=>t._id === id ? response.data :t))
    } catch (error) {
      console.log("error:",error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl shadow-8xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-tighter">Task Manager</h1>
        <form onSubmit={addtodo} className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded">
          <input className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400" type="text"
           placeholder="what need to be done ?" value={newtodo} onChange={(e)=>{setnewtodo(e.target.value)}} required />
          <button type="submit" className="bg-blue-500 hover:bg-blue-900 rounded text-white px-4 mr-1 cursor-pointer">Add Task</button>
        </form>

        <div className="mt-4">
          { todo.length === 0 ? (
            <div></div>
          ):(
            <div className="flex flex-col gap-4">
              {todo.map((todos) =>(
                <div key={todos._id}>
                  {edittodo === todos._id ?(
                    <div className="flex items-center gap-x-4">
                      <input className="flex-1 p-3 border border-gray-500 rounded-lg outline-none shadow-inner" type="text" value={edittext} onChange={(e)=>setedittext(e.target.value)}/>

                      <div className="flex gap-x-2">
                        <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 cursor-pointer" onClick={()=>saveedit(todos._id)}><TiTick /></button>
                        <button className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-700 cursor-pointer" onClick={()=>setedittodo(null)}><RxCrossCircled /></button>
                      </div>
                    </div>
                   
                  ):(
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                          <button onClick={()=>toggletodo(todos._id)} className={`h-6 w-6 border rounded-full flex items-center justify-center
                             ${todos.completed? "bg-green-300 border-green-500":"border-gray-300 hover:border-blue-500"}`}>
                              {todos.completed && <TiTick />}</button>
                          <span className="text-gray-800 font-medium">{todos.text}</span>
                        </div>
                         <div className="flex gap-x-2">
                          <button className="p-3 text-blue-400 hover:text-gray-900 rounded-lg duration-200" onClick={()=>editing(todos)}><FaEdit /></button>
                          <button onClick={()=>{deletetodo(todos._id)}} className="p-3 text-red-500 hover:text-red-700 rounded-lg duration-200"><MdDelete /></button>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App