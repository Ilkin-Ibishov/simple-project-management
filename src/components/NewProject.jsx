import { useRef } from "react"
import Input from "./Input.jsx"
import Modal from "./Modal.jsx";
import { requestFunction } from "../requests/request.jsx";

export default function NewProject({setProjectState, fetchData}){
    const modal = useRef();
    let title = useRef();
    let description = useRef();
    let dueDate = useRef();
    function handleCancelAddProject(){
        setProjectState(prevState=>{
          return{
          ...prevState, 
          selectedProjectId: undefined
        }})
    }
    const handleAddProject= async(projectData)=>{
        const newId =  (await requestFunction({destination: 'projects', id: '', fetchMethod: 'POST', data: projectData })).id;
        await requestFunction({destination: 'projectTasks', id: '', fetchMethod: 'POST', data: {
            tasks: [
            ],
            id: newId
          } })
        fetchData()
        setProjectState(prevState=>{
          return{
          ...prevState,
          selectedProjectId: undefined,
        }})
    }
    function handleSave(){
        const enteredTitle = title.current.value
        const enteredDescription = description.current.value
        const enteredDueDate = dueDate.current.value

        // validation...
        if( enteredTitle.trim()==='' || enteredDescription.trim()==='' || enteredDueDate.trim()===''){
            modal.current.open();
            return
        }
        handleAddProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }
    
    return<div className=" w-[35rem] mt-16 ">
        <Modal ref={modal}>
            <h2 className="text-xl font-bold text-stone-500 mt-4 my-4">Invalid input</h2>
            <p className=" text-stone-400 mb-4">Looks like you forgot to enter a valid value for every input field</p>
        </Modal>
        <menu className=" flex items-center justify-end gap-4 my-4">
            <li><button onClick={handleCancelAddProject} className=" text-stone-800 hover:text-stone-950">Cancel</button></li>
            <li><button onClick={handleSave} className=" px-6 py-2 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-950">Save</button></li>
        </menu>
        <div>
            <Input type={'text'} ref={title} label={"Title"} />
            <Input ref={description} label={"Description"} textarea />
            <Input type={'date'} ref={dueDate} label={"Due Date"} />
        </div>
    </div>
}