import { useRef } from "react";
import { requestFunction } from "../requests/request";


export default function NewTask({ currentTasks, onAddTask, projectId, changeTasks }) {
  const newTask = useRef();

  const handleAddTask = async () => {
    const taskName = newTask.current.value.trim();
    if (taskName) {
        const newTaskId = projectId + String(Math.random())
        const allTasks = [...currentTasks, {name: taskName, id: newTaskId}]
        let newData = {tasks: 
            allTasks
          }
        await requestFunction({destination: 'projectTasks', id: projectId, fetchMethod: 'PUT', data: newData });
        onAddTask()
        newTask.current.value = '';
        const tasksData = await requestFunction({ destination: 'projectTasks', id: projectId, fetchMethod: 'GET', data: undefined });
        changeTasks(tasksData.tasks)
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input ref={newTask} className="w-64 px-2 py-1 rounded-sm bg-stone-200" type="text" />
      <button onClick={handleAddTask} className="text-stone-700 hover:text-stone-950">
        Add Task
      </button>
    </div>
  );
}
