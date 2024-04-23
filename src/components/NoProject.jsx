import noProjectImage from '../assets/no-projects.png'
import Button from './Button'

export default function NoProject({onStartNewProject}){

    return <div className=" mt-24 text-center w-2/3">
        <img src={noProjectImage} alt="No Project Image" className=' w-32 h-32 mx-auto object-contain' />
        <h2 className=' text-xl font-bold text-stone-500 mt-4 my-4'>No project selected</h2>
        <p className=' text-stone-400 mb-4'>Select a project or get started with a new one</p>
        <p className=' mt-8'><Button onClick={onStartNewProject}>Create a new project</Button></p>
    </div>
}