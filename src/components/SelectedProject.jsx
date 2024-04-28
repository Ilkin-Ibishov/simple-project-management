import TaskList from "./Tasks";
import { useEffect, useState, useRef } from "react";
import { requestFunction } from "../requests/request";
import Modal from "./Modal";

export default function SelectedProject({ project, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [isEditActive, setEditActive] = useState(false)
  const inputProjectName = useRef(null);
  const inputProjectDescription = useRef(null);
  const inputProjectDueDate = useRef(null);
  const modal = useRef();
  const handleProjectEditSave = async()=>{
    const editedProjectData = {title: inputProjectName.current.value, description: inputProjectDescription.current.value, dueDate: inputProjectDueDate.current.value}
    await requestFunction({destination: 'projects', id: project.id, fetchMethod: 'PUT', data: editedProjectData })
    setEditActive(false)
    const responseData = await requestFunction({ destination: 'projectTasks', id: project.id, fetchMethod: 'GET', data: undefined });
    const tasksData = responseData.tasks;
    setTasks(tasksData);
  }
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await requestFunction({ destination: 'projectTasks', id: project.id, fetchMethod: 'GET', data: undefined });
        const tasksData = responseData.tasks;
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [project]);
  console.log(project);
  // Format the date
  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="w-[35rem] mt-16">
      <Modal forDelete={true} onDelete={onDelete} ref={modal}>
            <h2 className="text-xl font-bold text-stone-500 mt-4 my-4">Are you sure?</h2>
            <p className=" text-stone-400 mb-4">Looks like you are trying to delete {project.title}</p>
      </Modal>
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{isEditActive? <input ref={inputProjectName} className=" border-2 bg-stone-100" defaultValue={project.title} type="text" />: project.title}</h1>
          <div>
          {isEditActive? <button onClick={()=>handleProjectEditSave()} className=" text-slate-900 hover:text-slate-600 bg-gray-200 p-2 mr-4">Save</button> :<button onClick={()=>setEditActive(true)} className=" text-slate-900 hover:text-slate-600 bg-gray-200 p-2 mr-4">Edit</button>}
          {isEditActive? <button onClick={()=>setEditActive(false)} className=" text-stone-400 hover:text-stone-800 bg-gray-200 p-2">Cancel</button> : <button onClick={()=>modal.current.open()} className=" text-red-400 hover:text-red-800 bg-gray-200 p-2">Delete</button>}
          </div>
        </div>
        <p className="mb-4 text-stone-400">{ isEditActive? <input type="date" ref={inputProjectDueDate} defaultValue={project.dueDate} />: formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{isEditActive? <input className=" w-80" ref={inputProjectDescription} defaultValue={project.description} type="text" />: project.description}</p>
      </header>
      <TaskList changeTasks={setTasks} projectId={project.id} projectTasks={tasks} />
    </div>
  );
}
