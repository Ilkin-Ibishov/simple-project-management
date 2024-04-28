import NewTask from "./NewTask.jsx";
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Task from "./Task.jsx";
import { requestFunction } from "../requests/request.jsx";

const TaskList =  ({projectTasks, projectId, changeTasks}) => {
  const [ProjectTasks, setTasks] = useState(projectTasks);
  useEffect(()=>{
    setTasks(projectTasks)
    
  }, [projectTasks])

  const moveTask = async (dragIndex, hoverIndex) => {
    const draggedTask = ProjectTasks[dragIndex];
    const updatedTasks = [...ProjectTasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks)
    await requestFunction({ destination: 'projectTasks', id: projectId, fetchMethod: 'PUT', data: {tasks: updatedTasks} });
  };
  return ( <section>
        <h2 className=" text-2xl font-bold text-stone-700 my-4">Tasks</h2>
        <NewTask changeTasks={changeTasks} projectId={projectId} currentTasks={projectTasks} />
        <DndProvider backend={HTML5Backend}>
            {ProjectTasks.length > 0? undefined: <span className=" my-3">There is currently not any tasks available in this project</span>}
            <div className="w-full max-w-md mt-8">
                {ProjectTasks&&ProjectTasks.map((task, index) => (<div key={index} className="flex  gap-0">
                  <div className=" bg-gray-200 p-3 mb-2">
                    <div className=" text-xl rounded-full">{index + 1}</div>
                  </div>
                <Task setTasks={setTasks} projectId={projectId} tasks={ProjectTasks} key={task.id} id={task.id} text={task.name} index={index} moveTask={moveTask} />
                </div>
                ))}
            </div>
        </DndProvider>
  </section>
    
  );
};

export default TaskList;

