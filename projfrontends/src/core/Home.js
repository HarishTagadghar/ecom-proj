import React , {useState , useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls"

export default function Home() {

  const [products , setProducts] = useState([])
  const [errors , seterrors] = useState(false)

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        seterrors(data.error)
      }else{
    setProducts(data)
      }
    })
  }

  useEffect(()=>{
   preload()
  }, [])

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
       {products.map((product , index) => {
         return (
           <div key={product._id} className="col-4 mb-4">
             <Card product={product} />
           </div>
         )
       })}
       
      </div>
    </Base>
  );
}

