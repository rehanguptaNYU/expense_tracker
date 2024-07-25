import './ExpenseForm.css'
import ModalForm from "../ModalForm/ModalForm";
import {Form,Button} from "react-bootstrap";
import DeleteModalForm from "../DeleteModalForm/DeleteModalForm";
import {FormEvent, useEffect, useRef, useState,} from "react";
import Joi from "joi"
import ExpenseTable from "../ExpenseTable/ExpenseTable";
function ExpenseForm(){
    const DescRef=useRef<HTMLTextAreaElement>(null);
    const QuantityRef=useRef<HTMLInputElement>(null);
    const PriceRef=useRef<HTMLInputElement>(null);
    const CategoryRef=useRef<HTMLSelectElement>(null);
    const FilterRef=useRef<HTMLSelectElement>(null);
    // @ts-ignore
    const [expense_array,setArray]=useState(localStorage.getItem("expenses")==null ? [] : JSON.parse(localStorage.getItem("expenses")));
    // @ts-ignore
    const [filter_array,setFilter]=useState(localStorage.getItem("expenses")==null ? [] : JSON.parse(localStorage.getItem("expenses")));
    const[isModalOpen,setModal]=useState(false)
    const [isDeleteModalOpen,setDeleteModal]=useState(false)
    const[initial_load,setLoad]=useState(false)
    // @ts-ignore
    const[categories,setCategory]=useState(localStorage.getItem("categories")==null ? ["Groceries","Housing","Education","Entertainment"] : JSON.parse(localStorage.getItem("categories")));
    const[valid_description,setDescValid]=useState(true)
    const[valid_quantity,setQuantityValid]=useState(true)
    const[valid_price,setPriceValid]=useState(true)
    const[description_index,setDescIndex]=useState(-1)
    const[quantity_index,setQuantityIndex]=useState(-1)
    const[price_index,setPriceIndex]=useState(-1)
    const[error_details,setErrorDetails]=useState([
            {
                message: "",
                path: [""],
                type: "",
                context: {
                    label: "",
                    key: ""
                }
            }
            ]
            )
    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault();
        initialState();
        let valid=validate()
        if(valid==true) {
            if (DescRef.current != null && QuantityRef.current != null && CategoryRef.current != null && PriceRef.current != null) {
                const newExpense = {
                    description: DescRef.current.value,
                    price: PriceRef.current.value,
                    quantity: QuantityRef.current.value,
                    category: CategoryRef.current.value,
                };
                // @ts-ignore
                setArray([...expense_array, newExpense])
                // @ts-ignore
            }
        }
        resetFormData()
    }
    const resetFormData=()=>{
        if(DescRef.current!=null && QuantityRef.current!=null && PriceRef.current!=null && CategoryRef.current!=null) {
            DescRef.current.value = "";
            QuantityRef.current.value="";
            PriceRef.current.value="";
        }

    }
    const schema=Joi.object(
        {
            description:Joi.string().pattern(/[a-z A-Z]+[0-9\s]*[.]*/).required().messages(
                {"string.pattern.base":"The description must contain at least one letter"}
            ),
            quantity:Joi.number().integer().required().min(1),
            price:Joi.number().required().min(0),
            category:Joi.string().required(),
        }

    )
    const validate=()=> {
        if (DescRef.current != null && PriceRef.current != null && QuantityRef.current != null && CategoryRef.current != null) {
            const result = schema.validate(
                {
                    description: DescRef.current.value,
                    quantity: QuantityRef.current.value,
                    price: PriceRef.current.value,
                    category: CategoryRef.current.value,
                },
                {abortEarly:false}
            )
            // @ts-ignore
            if (result.error != null && result.error != "") {
                // @ts-ignore
                setErrorDetails(result.error.details)
            }
            else{
                return true;
            }
        }
    }
    const handleDelete=(item: any)=>{
        let index=expense_array.indexOf(item)
        // @ts-ignore
        const pre_array=expense_array.slice(0,index)
        // @ts-ignore
        const post_array=expense_array.slice(index+1)
        // @ts-ignore
        setArray([...pre_array,...post_array])
        // @ts-ignore
    }
    useEffect(()=>{
        localStorage.setItem("expenses",JSON.stringify(expense_array))
    },[expense_array])

    useEffect(()=>{
        localStorage.setItem("categories",JSON.stringify(categories))
    },[categories])

    useEffect(()=>{
        if (FilterRef.current != null) {
            const FilterCategory = FilterRef.current.value;
            if (FilterCategory != "All Categories") {
                // @ts-ignore
                const filterArray= expense_array.filter((item) => item.category === FilterCategory)
                setFilter([...filterArray])
            }
            else{
                // @ts-ignore
                setFilter([...expense_array])
            }
        }
    },[expense_array])

    useEffect(()=>{
        error_details.map((item,index)=>{
            if(item.path[0]==="description"){
                setDescValid(false);
                setDescIndex(index)
            }
            else if(item.path[0]==="quantity"){
                setQuantityValid(false)
                setQuantityIndex(index)
            }
            else if(item.path[0]==="price"){
                setPriceValid(false)
                setPriceIndex(index)
            }



        })
    },[error_details])
    const initialState=()=>{
        setDescValid(true)
        setQuantityValid(true)
        setPriceValid(true)
    }
    const handleFilter=()=> {
        if (FilterRef.current != null) {
            const FilterCategory = FilterRef.current.value;
            if (FilterCategory != "All Categories") {
                // @ts-ignore
                const filterArray= expense_array.filter((item) => item.category === FilterCategory)
                setFilter(filterArray)
            }
            else{
                // @ts-ignore
                setFilter([...expense_array])
            }
        }
    }
    const showModal=()=>{
            setModal(true)
    }
    const openDeleteModal=()=>{
        setDeleteModal(true)
    }
    const displayCategories= categories.map((category:string)=> {
        return (
            <option>{category}</option>
        )
    }
    )



    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return(
        <div>
            <div className="expense-container">
                <div className="heading-bg">
                    <h2 className="text-center mt-3 mb-3">Expense Tracker</h2>
                </div>
            </div>
            <Form className="second-bg" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="h4 mt-3 text-color mb-3">Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter the type or name of the product"
                                  ref={DescRef} name="description"
                                  isInvalid={
                                      (valid_description ? false : true)
                                  }
                                  isValid={
                                      (valid_description)
                                  }
                                  className={(valid_description ? "border border-3 border-success fs-5" : "border border-3 border-danger fs-5")}
                    ></Form.Control>
                 <Form.Control.Feedback className="text-danger ms-3 fs-5" type="invalid">{error_details[description_index]?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="h4 mt-3 text-color mb-3">Quantity</Form.Label>
                    <Form.Control type="text" placeholder="Enter Quantity of product"
                                  ref={QuantityRef} name="quantity"
                                  isInvalid={
                                      (valid_quantity ? false : true)
                                  }
                                  isValid={
                                      (valid_quantity)
                                  }
                                  className={(valid_quantity ? "border border-3 border-success fs-5": "border border-3 border-danger fs-5")}
                    ></Form.Control>
                    <Form.Control.Feedback className="text-danger ms-3 fs-5 " type="invalid">{error_details[quantity_index]?.message}</Form.Control.Feedback>

                </Form.Group>
                <Form.Group>
                    <Form.Label className="h4 mt-3 text-color mb-3">Total Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter the total price of the product"
                                   ref={PriceRef} name="price"
                                  isInvalid={
                                      (valid_price ? false : true)
                                  }
                                  isValid={
                                      (valid_price)
                                  }
                                  className={valid_price ? "border border-3 border-success fs-5" : "border border-3 border-danger fs-5"}


                    ></Form.Control>
                    <Form.Control.Feedback className="text-danger ms-3 fs-5" type="invalid">{error_details[price_index]?.message}</Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label className="form-label h4 mt-3 mb-3 text-color">Category</Form.Label>
                    <Button type="button" className="btn btn-danger float-end ms-4 fs-6" onClick={openDeleteModal}>Delete Category</Button>
                    <Button type="button" className="btn btn-primary float-end fs-6" onClick={showModal}>Add Category</Button>
                    <Form.Select className="form-select-lg fs-5 border border-2 border-dark" ref={CategoryRef}>{displayCategories}</Form.Select>
                    <br/>
                    <Button type="submit" className="bg-primary text-white btn-lg fs-5">Submit</Button>
                </Form.Group>
            </Form>
            <br/>
            <br/>
            <div>
                <select className="form-select form-select-lg fs-5 border border-2 border-dark select-positioning" ref={FilterRef} onChange={handleFilter}>
                    <option>All Categories</option>
                    {displayCategories};
                </select>
            </div>
            <br/>
            <ExpenseTable expenses={filter_array} delete={handleDelete}></ExpenseTable>
            <ModalForm updateCategories={setCategory} currentCategories={categories} handleModal={setModal}
                       CurrentModal={isModalOpen}></ModalForm>
            <DeleteModalForm removeCategories={setCategory} currentCategories={categories} currentDeleteModal={isDeleteModalOpen} handleDeleteModal={setDeleteModal} deleteCategories={handleDelete} expenseArray={expense_array} ></DeleteModalForm>
        </div>
    )
}

export default ExpenseForm;
