import NewTask from "./NewTask";

export default function Tasks({projectTasks, onAddTask, projectId, changeTasks}){
    return <section>
        <h2 className=" text-2xl font-bold text-stone-700 my-4">Tasks</h2>
        <NewTask changeTasks={changeTasks} projectId={projectId} currentTasks={projectTasks} onAddTask={onAddTask} />
        <p className=" text-stone-800 mb-4">This project does not have any projects yet.</p>
        <ul>
            {projectTasks&&projectTasks.map((task, key)=>(
                <li key={key}>{task.name}</li>
            ))}
        </ul>
    </section>
}