import './ModalForm.css'
import {FormEvent, useEffect, useRef} from "react";
import {Modal} from "react-bootstrap"
function ModalForm(props: { updateCategories: (arg0: any[]) => void; currentCategories: any; handleModal: (arg0: boolean) => void; CurrentModal: boolean | undefined; }){
    const NewCategory=useRef<HTMLInputElement>(null)
    const handleSubmit=(event:FormEvent)=>{

        event.preventDefault();
        if(NewCategory.current!=null){
            props.updateCategories([...props.currentCategories,NewCategory.current.value]);
            props.handleModal(false)
        }
    }
    const closeModal=()=>{
        props.handleModal(false)
    }
    return (
        <Modal show={props.CurrentModal} onHide={closeModal}>
            <Modal.Dialog>
                <Modal.Header className="bg-orange text-center">
                    <Modal.Title>
                        <h4 className="text-white text-center">Add Categories</h4>
                    </Modal.Title>
                    <button className="btn-close btn-dark" onClick={closeModal}></button>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-control bg-primary" onSubmit={handleSubmit}>
                        <label className="form-label h4 mt-3 text-white">Add Category</label>
                        <br></br>
                        <input type="text" className="border border-2 border-dark" ref={NewCategory}></input>
                        <br></br>
                        <br/>
                        <button type="submit" className="btn btn-dark text-white">Submit</button>
                    </form>
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    )
}

export default ModalForm;