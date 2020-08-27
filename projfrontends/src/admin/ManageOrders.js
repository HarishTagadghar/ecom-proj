import React, { useState, useEffect } from "react";
import { getOrders, updateStatus } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Menu from "../core/Menu";
import Footer from "../core/Footer"
import { Table } from 'react-bootstrap'


const ManageOrders = () => {

    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState(false)


    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;



    const preload = (userId, token) => {
        getOrders(userId, token).then(order => {

            if (!order || order.error) {
                setErrors(order.error)

            } else {
                setOrders(order)
            }
        })
    }

    useEffect(() => {
        preload(userId, token)
    })



    const handler = (event) => {
        // console.log(event.target.value.split(',')[0]);
        let object = {
            orderId: event.target.value.split(',')[1],
            status: event.target.value.split(',')[0]
        }
        updateStatus(object, isAutheticated().user._id, isAutheticated().token).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
        // console.log(object);
    }
    // console.log(isAutheticated().user._id);
    return (
        <div>
            <Menu />
            <div className="ocontainer">
                <h1 className="text-center pb-4 pt-4">Total Orders Are {orders.length}</h1>
                <Table className="tab" responsive striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Product</th>
                            <th>Transaction-id</th>
                            <th>Phone No.</th>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>₹{order.amount}</td>
                                    <td>{order.address}</td>
                                    <td>{order.updatedAt}</td>
                                    <td className="pr-5">{order.status}
                                        <select onClick={handler} className="ml-4">
                                            <option value={`Order Placed,${order._id}`} >Order Placed</option>
                                            <option value={`Processing,${order._id}`} >Processing</option>
                                            <option value={`Shipped,${order._id}`} >Shipped</option>
                                            <option value={`Delivered,${order._id}`} >Delivered</option>
                                        </select>
                                    </td>
                                    <td > {order.products.map((product, i) => {
                                        return (
                                            <ul key={i}>
                                                <li>
                                                    {product.name} <br /> quantity - {product.count}
                                                </li>

                                            </ul>
                                        )
                                    })}</td>
                                    <td>{order.transaction_id}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.user.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <Footer />
        </div >
    )
}

export default ManageOrders;