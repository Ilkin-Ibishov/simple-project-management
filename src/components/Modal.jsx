import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Button from "./Button";

const Modal = forwardRef(function Modal({children, forDelete, onDelete}, ref){
    const dialog = useRef();
    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return createPortal(<dialog ref={dialog} className=" backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
        {children}
        <div className="flex justify-between">
        <form method="dialog"><Button>Close</Button></form>
        {forDelete&&<button onClick={onDelete}>Delete</button>}
        </div>
    </dialog>, document.getElementById('modal-root'))
})

export default Modal