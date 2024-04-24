import Button from "./Button"
import { motion } from "framer-motion"


export default function ProjectsSideBar({onSelectProject, onStartNewProject, projects, selectedProjectId}){
    return <>
    <aside className=" w-1/3 bg-stone-900 text-stone-50 px-8 py-16 md:w-72 rounder-r-xl">
        <h2 className=" mb-8 font-bold uppercase  md:text-xl ">Your Projects</h2>
        <div><Button onClick={onStartNewProject}> + Add project</Button></div>
        <ul className=" mt-8">
            {projects.map((project, key)=>{
                let cssClasses = ' w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
                if(project.id === selectedProjectId){
                    cssClasses += ' bg-stone-800 text-stone-200'
                }else{
                    cssClasses += ' text-stone-400'
                }
                return (
                    <li key={key}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}><button onClick={()=>onSelectProject(project.id)} className={cssClasses}>{project.title}</button></motion.div>
                    </li>
                )
            })}
        </ul>
    </aside>
    </>
}