import React , {useState , useEffect} from "react";
import Base from "../core/Base";
import { getUserOrders } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper";

const userId = isAutheticated() && isAutheticated().user._id;
const token = isAutheticated() && isAutheticated().token;


const UserDashBoard = () => {

  const [orders , setOrders] = useState([])
const [errors , setErrors] = useState(false)

let preload = (userId , token) => {
  getUserOrders(userId , token).then(order => {
  
    if(!order){
      setErrors(true)
    }else{
      setOrders(order)
    }
    
  })
}
const {amount , updatedAt , products ,transaction_id , user} = orders

useEffect(()=> {
  preload(userId , token)
}, [])

console.log(orders);

  return (
    <Base title="UserDashBoard page"   >
    <h1 className="mb-4">hey {isAutheticated().user.name}</h1>
      <h1>Your total Orders are {orders.length ? orders.length : 0}</h1>
     
     

{orders.map((order,i) => {
 return (
  <ol key={i}>
        <li  >
           amount : ₹{order.amount} orderd on - {order.createdAt}    - products 
            
            {order.products.map((product , i)=> { return (  
    <ul key={i}>
        <li>
           {product.name} quantity - {product.count}
        </li>
        
    </ul>
    )})}
        </li>
    </ol>
 )
})}
      
    </Base>
  );
};

export default UserDashBoard;
