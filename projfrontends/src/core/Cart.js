import React , {useState , useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout"
import Paypal from "./Paypal";
import Razorpay from "./Razorpay";
import total from "./total";


const  Cart = ()  => {

  const [products , setProducts] = useState([])
  const [reload , setReload] = useState(false)

  useEffect(()=>{
  setProducts(loadCart())
  }, [reload])
console.log(products);

  const productTitle = products ? <h2>your products</h2> : <h2>No product found</h2>

  const loadProducts = (products) => {
      return (
          <div>
          {productTitle}
          {products && (
            products.map((product , index) => (
              <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
               />
          ))
          )}
          </div>
      )
  }


  console.log(products);
  

  return (
    <Base title="Cart Items" description="Get Reddu For Checkout">
      <div className="row text-center">
        <div className="col-6">{  products && products.length > 0 ? loadProducts(products): (<h3>NO products in your cart</h3>)}</div>
        <div className="col-6">
      
   
      <Razorpay 

      products={products}
      setReload={setReload}

      />


{/* 
        <StripeCheckout
        products={products}
        setReload={setReload}
         /> */}

        {/* <Paypal products={products} setReload={setReload} /> */}



         </div>
      </div>
    </Base>
  );
}

export default Cart ;