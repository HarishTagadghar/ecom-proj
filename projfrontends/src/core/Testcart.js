import React , {useState , useEffect} from 'react';
import image from '../images/chair.jpg'
import { addItemToCart } from './helper/cartHelper';
import { Redirect } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';
import { API } from '../backend';

// const image = `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
const Testcart = ({product ,  setReload = f => f /* (f) => return f  */ , reload = undefined}) => {


  const [redirect , setRedirect ] = useState(false)

    product.price = product.price  ;
    

    const cartTitle = product ? product.name : "Default Title"
    const cartDescription = product ? product.description : "Default Description"
    const cartPrice = product ? product.price : "Default Price"

    const imageUrl = product 
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    ;



    const addtocart = () => {
      addItemToCart(product , () => alert("item added to cart"))
    } 
    const addtocart2 = () => {
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
        <div className="test">
        <div style={{backgroundImage: `url(${imageUrl})`}} id="curve" className="ccard">
       <div className="price-box">
        <h1 className="price">₹{cartPrice}</h1>
        </div>
        {getARedirect(redirect)}
          <div className="cfooter">
            <div className="connections">
              <div onClick={addtocart} className="connection ccart">
              <img    src={require("../images/SVG/cart-copy.svg")} className="ccart-icon" alt=""/>
                </div>
              <div  onClick={addtocart2} className="connection cbuy">
              <img   src={require("../images/SVG/credit-card.svg")} className="cbuy-icon" alt=""/>
              </div>
              <div  onClick={addtocart2} className="connection cview">
              <img    src={require("../images/SVG/eye.svg")} className="cview-icon" alt=""/>
              </div>
            </div>
        
            <div className="cinfo">
              <div className="name">{cartTitle}</div>
              <div className="job">{cartDescription}</div>
            </div>
          </div>
          {/* <div className="ccard-blur" /> */}
        </div>
      </div>
    )
}

export default Testcart