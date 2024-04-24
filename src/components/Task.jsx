import * as React from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useState } from "react";
import { requestFunction } from "../requests/request";


const Task = ({ id, text, index, moveTask, setTasks, tasks, projectId }) => {
    const [isEditActive, setEditActive] = useState(false)
    const newTaskInputName = React.useRef(null);
    const ref = React.useRef(null);
    const [, drop] = useDrop({
      accept: 'TASK',
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveTask(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
      ,
    })
    ;
    const [{ isDragging }, drag] = useDrag({
      type: 'TASK',
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    const handleSave = async()=>{
        const newTasks = [...tasks];
        newTasks[index] = { name: newTaskInputName.current.value, id: id };
        setTasks(newTasks);
        setEditActive(false);
        await requestFunction({ destination: 'projectTasks', id: projectId, fetchMethod: 'PUT', data: {tasks: tasks} });

    }
    const handleDelete = async ()=>{
        function deleter(deletedTask){
            return deletedTask.id !== id
        }
        const newTasks = [...tasks].filter(deleter)
        setTasks(newTasks);
        setEditActive(false);
        await requestFunction({ destination: 'projectTasks', id: projectId, fetchMethod: 'PUT', data: {tasks: tasks} });
    }
    
    return (
      <div ref={ref} style={{ opacity }} className="bg-gray-200 p-4 mb-2 flex w-[100%] justify-between">
        {isEditActive? <input ref={newTaskInputName} width={"20rem"} type="text" defaultValue={text} /> :text}
        {isEditActive? <div className="flex gap-5"><span className=" cursor-pointer" onClick={()=>handleSave()}>Save</span><span className=" cursor-pointer" onClick={()=>setEditActive(false)}>Cancel</span></div>: <div><span className=" cursor-pointer pr-3" onClick={()=>setEditActive(true)}>Edit</span><span className=" cursor-pointer" onClick={()=>handleDelete()}>Delete</span></div>}
      </div>
    );
  };

  export default Task;