import React , {useState , useEffect} from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import {getProducts } from "./helper/coreapicalls"
import {getCategoryById} from "./helper/categoryHelper"
import {getCategories} from "../admin/helper/adminapicall"
import Menu from "./Menu";
import Test from "./Test";
import Footer from "./Footer";

export default function Home() {

  const [products , setProducts] = useState([])
  const [errors , seterrors] = useState(false)
  const [categories , setCategory] = useState([])
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

  const preloadCategory = () => {
    getCategories().then(data => {
      if (data.error) {
        seterrors({error: data.error });
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    preloadCategory();
  }, []);


  const handleChange = event => {

    event.target.value && event.target.value === "all" ? (
      getProducts().then(data => {
        if (data.error) {
          seterrors(data.error)
        }else{
      setProducts(data)
        }
      })
    ): (
      getCategoryById({"_id":event.target.value}).then(data => {
        if (data.error) {
          seterrors(data.error)
        } else {
          setProducts(data)
        }
      })
    );
    
  }


  return (
    // <Base title="Home Page" description="Welcome to the Tshirt Store">
    //   <div className="row text-center">
    //   <select
    //      onChange={handleChange}
    //       className="form-control mb-4"
    //       placeholder="Category"
    //     >
    //       <option value="all">All</option>
    //       {categories &&
    //         categories.map((cate, index) => (
    //           <option key={index} value={cate._id}>
    //             {cate.name}
    //           </option>
    //         ))}
    //     </select>

    //    {products.map((product , index) => {
    //      return (
    //        <div key={product._id} className="col-4 mb-4">
    //          <Card product={product} />
    //        </div>
    //      )
    //    })}
       
    //   </div>
    // </Base>
    <div>
    <Menu />
    <Test />
    <Footer />
    </div>
  );
}

