import React , { useState , useEffect} from 'react';
import {isAutheticated} from "../auth/helper/index";
import { loadCart  , cartEmpty} from './helper/cartHelper';
import {Link , Redirect} from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout"
import { API, STRIPE } from '../backend';
import { createOrder } from './helper/orderHelper';

const Razorpay = ({products , setReload = f => f , reload = undefined}) => {

    const [data , setData] = useState({
        name:"",
        loading:false,
        error:"",
        address:"",
        phone:"",
        redirect:true

       
    })
    const [amount , setAmount] = useState(0)

    const {name , loading , error , address , phone , redirect } = data

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated()._id;
    const user = isAutheticated() && isAutheticated();

console.log(amount);
            
        const showTotalAmount = () =>{
            let amount = 0
            products.forEach(product => {
                amount += product.price * product.count
            });
            // setAmount(amount)
            return amount
        }
   
        const loadScript = (src) => {
        return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)

        })
    }

    async function displayRazorpay()  {
        
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')


        if(!res){
            alert("Faield to load please try agian!")
            return
        }

       async function data(paymentInfo){ 
           
        return await fetch(`${API}/razorpay` , {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(paymentInfo)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return console.log(err)
        })
    }


  const detail =   data({
        amount:showTotalAmount(),
    })



        var options = {
            key: "rzp_test_NWtBjDWspuxUvT", // Enter the Key ID generated from the Dashboard
            amount: showTotalAmount() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name:products.name,
            description: products.description,
            image: "https://cdn.worldvectorlogo.com/logos/react.svg",
            order_id: detail.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
 
                alert('order placed successfully')
                const orderData = {
                    products:products,
                    amount:showTotalAmount(),
                    address:address,
                    user:user.user._id,
                    phone:phone,
                    transaction_id:response.razorpay_payment_id
                }

                createOrder(user.user._id , user.token , orderData).then(data=>{
                    if(!data || data.error){
                      console.log("failed to create order" , data.error);
                      
                    }else{
                      console.log("order created successfully");
                      
                    }
                  })
                 cartEmpty(() => {
                   console.log("did we got a crash!");
                   
                 })
                 setReload(!reload);
       
                 if (redirect) {
                  return   <Redirect to="/user/dashboard" />
                 }


            },
            prefill: {
                name:name,
                email: user.user.email,
                contact: `+91${phone}`
            },
            theme: {
                color: "#F37254"
            }
        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open()
    }

    




















    const showButton = () => {
        return isAutheticated() ? (
            <button  className="btn btn-success" onClick={displayRazorpay}> BUY NOW</button>

        ) : 
        
        (
            <Link to="/signup"><button className="btn btn-warning">signup</button></Link>
        ) ;
     }



     const handleChange = event => {
         setData({...data, error:false , loading: true , name: event.target.value})
     }

     const handleChange1 = event => {
        setData({...data, error:false , loading: true , address: event.target.value})
    }
    const handleChange2 = event => {
        setData({...data, error:false , loading: true , phone: event.target.value})
    }
  


  
    return (
       
        <div>
         
        <div className="form-group">
          <label className="text-light">Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            value={name}
            placeholder="Name"
          />
        </div>

         <div className="form-group">
          <label className=" text-danger">Address Required</label>
          <input
            className="form-control"
            onChange={handleChange1}
            type="text"
            value={address}
            placeholder="Address"
          />
        </div>

        <div className="form-group">
          <label className="text-danger">phone Required</label>
          <input
            onChange={handleChange2}
            className="form-control"
            type="tel"
            value={phone}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="123-45-678"
            required
          />
        </div>


      
     
        
        <h3  className="text-white"> checkouts ₹{showTotalAmount()} </h3>
        {showButton()}
    </div>

    )
       
}







export default Razorpay;