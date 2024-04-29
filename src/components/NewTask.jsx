import { useContext, useRef } from "react";
import { requestFunction } from "../requests/request";
import { ProjectContext } from "../store/add-new-task-context";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from "framer-motion"

export default function NewTask({ currentTasks, projectId, changeTasks }) {
  const newTask = useRef();
  const addtaskCtx = useContext(ProjectContext)

  const handleAddTask = async () => {
    const taskName = newTask.current.value.trim();
    if (taskName) {
        const newTaskId = projectId + String(Math.random())
        await requestFunction({destination: 'projectTasks', id: projectId, fetchMethod: 'PUT', data: {tasks: [...currentTasks, {name: taskName, id: newTaskId}]} });
        addtaskCtx.handleAfterProjectEdit
        newTask.current.value = '';
        const tasksData = await requestFunction({ destination: 'projectTasks', id: projectId, fetchMethod: 'GET', data: undefined });
        console.log(tasksData);
        changeTasks(prevP=> ({...prevP, tasks: tasksData.tasks}))}
  }

  return (
    <div className="flex items-center gap-4">
      <input placeholder=" New task name..." ref={newTask} className="w-64 px-2 py-1 rounded-sm bg-stone-200" type="text" />
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
        <button onClick={handleAddTask} className="text-stone-700 hover:text-stone-950">
        Add Task
        </button>
      </motion.div>
      <Tooltip placement={"right"} title="You can drag and drop tasks to change their order">
        <InfoIcon />
      </Tooltip>
    </div>
  );
}
