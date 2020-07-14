import React , {useState , useEffect} from 'react';
import { addItemToCart } from './helper/cartHelper';
import { Redirect } from 'react-router-dom';
import { API } from '../backend';
import ImageHelper from './helper/ImageHelper';

const SideProduct = ({product ,  setReload = f => f /* (f) => return f  */ , reload = undefined}) => {
  

    const [redirect , setRedirect ] = useState(false)

    const cartTitle = product ? product.name : "Default Title"
    const cartDescription = product ? product.description : "Default Description"
    const cartPrice = product ? product.price : "Default Price"

  




    const addtocart = () => {
        addItemToCart(product , () => {
          setRedirect(true)
        })
      }
      const getARedirect = (redirect) => {
        if (redirect) {
          return <Redirect to="/cart" />
        }
      }
  
  
  
  
    return (
        <div onClick={addtocart} className="side-product">
            <ImageHelper product={product} />
            {getARedirect(redirect)}
            <div className="side-product-info">
                <h3 className="side-product-info-title" >{cartTitle}</h3>
             
                <h2 className="side-product-info-price">₹{cartPrice}</h2>
            </div>
        </div>
    )
}

export default SideProduct