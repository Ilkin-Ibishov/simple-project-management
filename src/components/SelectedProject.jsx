import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import { requestFunction } from "../requests/request";

export default function SelectedProject({ project, onDelete, onAddTask }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await requestFunction({ destination: 'projectTasks', id: project.id, fetchMethod: 'GET', data: undefined });
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks data:', error);
      }
    };

    fetchTasks();
  }, [project]);
  console.log("kkk", tasks);
  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button onClick={onDelete} className="text-stone-600 hover:text-stone-950">Delete</button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks changeTasks={setTasks} projectId={project.id} onAddTask={onAddTask} projectTasks={tasks.tasks} />
    </div>
  );
}
