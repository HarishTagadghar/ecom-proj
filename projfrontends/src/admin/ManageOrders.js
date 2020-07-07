import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {  getOrders  } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";


const ManageOrders = () => {

    const [orders , setOrders] = useState([])
    const [errors , setErrors] = useState(false)

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

  

    const preload = (userId , token) => {
        getOrders(userId , token).then(order => {
   
            if (!order || order.error) {
                setErrors(order.error)
         
            }else{ 
                  setOrders(order)
            }
        })
    }

    useEffect(()=>{
        preload(userId , token)
    })


    return (
        <Base title="ALL ORDERS" description="hey admin">
            <h1>all orders {orders.length}</h1>    
                    
{orders.map(order => {
 return (
  <ol key={order._id}>
        <li  >
           amount : ₹{order.amount}  orderd on - {order.createdAt} address - {order.address}  phoneNumber - {order.phone} - transaction_id: {order.transaction_id}
            - products 
            
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
    )
}

export default ManageOrders;