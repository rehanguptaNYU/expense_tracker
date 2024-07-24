import './DeleteModalForm.css'
import {Modal} from "react-bootstrap";
import {FormEvent, useRef} from "react";
import { JSX } from 'react/jsx-runtime';

function DeleteModalForm(props : { currentCategories: string[]; removeCategories: (arg0: any[]) => void; expenseArray: any[]; deleteCategories: (arg0: any) => void; handleDeleteModal: (arg0: boolean) => void; currentDeleteModal: boolean | undefined; }){
    const CategoryRef=useRef<HTMLInputElement>(null)
    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault();
        let deleteValue="";
        let deleteIndex=0;
        if(CategoryRef.current!=null){
            deleteValue=CategoryRef.current.value;
        }
        deleteIndex=props.currentCategories.indexOf(deleteValue)
        deleteCategory(deleteIndex);
        handleDeleteCategoryExpenses(deleteValue)
        closeModal()
    }
    const deleteCategory=(index:number)=>{
        const pre_categories=props.currentCategories.slice(0,index);
        // @ts-ignore
        const post_categories=props.currentCategories.slice(index+1);
        props.removeCategories([...pre_categories,...post_categories]);

    }
    const handleDeleteCategoryExpenses=(category:string)=>{
        props.expenseArray.map((item:any)=>{
            if(item.category===category){
                props.deleteCategories(item);
            }
        })
    }
    const closeModal=()=>{
        props.handleDeleteModal(false)
    }
    const categoryarray=props.currentCategories.map((item: string)=>{
        return(<option>{item}</option>)
    }
    )
    return(
        <Modal show={props.currentDeleteModal}>
            <Modal.Dialog>
                <Modal.Header className="bg-orange text-center">
                    <Modal.Title className="text-white text-center">Delete Category</Modal.Title>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-control bg-primary" onSubmit={handleSubmit}>
                        <h4 className="mt-3 text-white">Select the category you want to delete</h4>
                        <br></br>
                        <select className="form-select form-select-lg" ref={CategoryRef}>{categoryarray}</select>
                        <br></br>
                        <button type="submit" className="btn btn-dark text-white">Submit</button>
                    </form>
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    )
}
export default DeleteModalForm;
