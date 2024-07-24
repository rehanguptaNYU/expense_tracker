function ExpenseTable(props: { expenses: any[]; delete: (arg0: any) => void; }){
    const sum=props.expenses.reduce((current_sum,item)=>{
        current_sum=current_sum+parseInt(item.price);
        return current_sum;
    },0)
    return(
        <div>
            <table className="table table-hover table-bordered table-dark">
                <thead>
                    <tr className="h5">
                        <th>Description</th>
                        <th>Price($)</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                {props.expenses.map((item,index)=>{
                        // @ts-ignore
                        return (
                            <tr key={index} className="fs-5">
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button className="btn btn-outline-danger fs-5" onClick={()=>props.delete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                }
                )
                }
                </tbody>
                <tfoot>
                <tr className="table-primary fs-5">
                    <td>Total Price($)</td>
                    <td>{sum}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default ExpenseTable;
