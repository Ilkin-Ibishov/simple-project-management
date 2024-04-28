import TaskList from "./Tasks";
import { useEffect, useState, useRef } from "react";
import { requestFunction } from "../requests/request";
import Modal from "./Modal";

export default function SelectedProject({ project, onDelete, onProjectEdit }) {
  const [selectedProject, setSelectedProject] = useState({...project, tasks: []});
  const [isEditActive, setEditActive] = useState(false)
  const inputProjectName = useRef(null);
  const inputProjectDescription = useRef(null);
  const inputProjectDueDate = useRef(null);
  const modal = useRef();
  // Assuming dueDate is a string in the format "YYYY-MM-DD"
const dueDate = project.dueDate;

// Convert the dueDate string to a Date object
const dueDateObject = new Date(dueDate);

// Get the current date
const currentDate = new Date();

// Calculate the difference in milliseconds between the due date and the current date
const differenceInMilliseconds = dueDateObject - currentDate;

// Convert milliseconds to days
const daysRemaining = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

console.log("Days remaining:", daysRemaining);
  const handleProjectEditSave = async()=>{
    const editedProjectData = {title: inputProjectName.current.value, description: inputProjectDescription.current.value, dueDate: inputProjectDueDate.current.value}
    await requestFunction({destination: 'projects', id: project.id, fetchMethod: 'PUT', data: editedProjectData })
    setEditActive(false)
    onProjectEdit()
  }
  useEffect(() => {
    const daysRemaining = Math.ceil((new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    const fetchTasks = async () => {
      try {
        const responseData = await requestFunction({ destination: 'projectTasks', id: project.id, fetchMethod: 'GET', data: undefined });
        const tasksData = responseData.tasks;
        setSelectedProject({...project, tasks: tasksData})
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [project]);
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
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{isEditActive? <input ref={inputProjectName} className=" border-2 bg-stone-100" defaultValue={project.title} type="text" />: selectedProject.title}</h1>
          <div>
          {isEditActive? <button onClick={()=>handleProjectEditSave()} className=" text-slate-900 hover:text-slate-600 bg-gray-200 p-2 mr-4">Save</button> :<button onClick={()=>setEditActive(true)} className=" text-slate-900 hover:text-slate-600 bg-gray-200 p-2 mr-4">Edit</button>}
          {isEditActive? <button onClick={()=>setEditActive(false)} className=" text-stone-400 hover:text-stone-800 bg-gray-200 p-2">Cancel</button> : <button onClick={()=>modal.current.open()} className=" text-red-400 hover:text-red-800 bg-gray-200 p-2">Delete</button>}
          </div>
        </div>
        <div className="flex gap-6">
        <div className="flex gap-2">
          <p>{ isEditActive? "Change deadline date" :"Deadline date:"}</p>
          <p className="mb-4 text-stone-400">{ isEditActive? <input className=" border-2 border-black" type="date" ref={inputProjectDueDate} defaultValue={project.dueDate} />: formattedDate}</p>
        </div>
        <p>Days remaining: {daysRemaining}</p>
        </div>
        <p className="text-stone-600 whitespace-pre-wrap">{isEditActive? <input className=" w-80" ref={inputProjectDescription} defaultValue={project.description} type="text" />: selectedProject.description}</p>
      </header>
      <TaskList changeTasks={setSelectedProject} projectId={project.id} projectTasks={selectedProject.tasks} />
    </div>
  );
}

