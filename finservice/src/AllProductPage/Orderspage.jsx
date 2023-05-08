import { useContext } from "react"
import { AppContext } from "../Context/Appcontext"

function Orders(){
    const {orders}=useContext(AppContext)
    return<>
    <h5>{orders.map((e,i)=>(
        <div key={i} >
            <p>{e.name}</p>
         
            <p></p>
            <p></p>
            <p></p>
            <p></p>

        </div>
    ))}</h5>
    </>
}
export default Orders