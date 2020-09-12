import React, {useState , useEffect} from 'react';
import { getProduct } from '../admin/helper/adminapicall';
import { API } from '../backend';
import Menu from './Menu';
import Footer from './Footer';
import { getCategoryById } from './helper/categoryHelper';
import ReactElasticCarousel from 'react-elastic-carousel';
import IndexCard from './IndexCard';
import { addItemToCart } from './helper/cartHelper';
import { Redirect, Link } from 'react-router-dom';

const RelatedPage = ({match}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategory] = useState("")
  const [redirect , setRedirect ] = useState(false)

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 100;
const breakPoints = [
  {width:100 , itemsToShow: 1},
  {width:300 , itemsToShow: 2},
  {width:550 , itemsToShow: 3},
  {width:768 , itemsToShow: 4},
  {width:1200 , itemsToShow: 5},
]
    const [values, setValues] = useState({
        name: "",
        description: [],
        price: "",
        photo: "",
        loading: false,
        error: "",
        megadescription:[],
        categoryId:"",
        product:{}
      });
    
      const {
        name,
        description,
        price,
        photo,
        loading,
        error,
        product

      } = values;
    const preload = (productId) => {
        getProduct(productId).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            
            console.log(data);
            setValues({
              ...values,
              name: data.name,
              description: data.description.split("||"),
              price: data.price,
              photo: `${API}/product/photo/${data._id}` ,
              product:data
            });
            setCategory(data.category._id)
          }
        });
      };
      getCategoryById({ "_id": categories }).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setProducts(data)
        }
      })
      useEffect(() => {
        preload(match.params.productId);
      }, []);

      let formateNumber = (num) => {
        let numSplit , int , dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if(int.length > 3){
          int = int.substr(0,int.length - 3) + ',' +int.substr(int.length - 3 , 3);
        }
        dec = numSplit[1]
        return int + '.' + dec
      }
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
// console.log(products);
    return (
      <div className="product-main">
        <div className="product-container-menu">
        <Menu></Menu>
        </div>
        <div className="product-container ">
        <div className="product-container-left ">
        <div className="vertical-line"> </div>

            <img className="product-container-left-image" src={photo} alt=""/>
            <div className="product-container-left-button">
            {getARedirect(redirect)}

            <button onClick={addtocart2} className="product-container-left-button-2 product-button"> <img className="product-icon" src={require("../images/SVG/credit-card.svg")} alt=""/> Buy Now</button>
          
            <button onClick={addtocart} className="product-container-left-button-1 product-button"> <img className="product-icon" src={require("../images/SVG/cart.svg")} alt=""/> Add To Cart</button>
        </div>
            </div>
        <div className="product-container-right ">
        
            <h1 className="product-container-right-name">{name}</h1>
            <h3 className="product-container-right-description">Description : {description[0]}</h3>
            <h1 className="product-container-right-price">Price: ₹{formateNumber(price)}</h1>
           
            <div className="product-container-right-color">
                <h4 className="product-container-right-color-name">Color : </h4>
                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-blue shadow-lg">
                      </div>
                        <h3>Blue</h3>
                  </div>

                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-red shadow-lg">
                      </div>
                        <h3>Pink</h3>
                  </div>
                  <div className="product-container-right-color-one-container">
                      <div className="product-container-right-color-one-container-green shadow-lg">
                      </div>
                        <h3>Green</h3>
                  </div>
            </div>
        
            <div className="product-container-right-size">
                <h4 className="product-container-right-size-name">Size : </h4>
                <select >
                <option >Select</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
            </select>
            </div>
        
        <div className="product-container-right-content">
          <h4>Content:</h4>
          <ul>
          {description.map((point,i) => {
                  return(
                    <li className="product-container-right-content-point" key={i}>{point}</li>
                  )  
            })}
          </ul>
        </div>
     
        </div>
        <div className="horizontal-line">

        </div>
        <div className="related-products-container">
        <h1 className="related-products-hedding">
        {products.length} Related products 
        </h1>
            <ReactElasticCarousel className="related-products-carousel" breakPoints={breakPoints} >
          {products.map((product,i) => {
           return(
            <div key={i} className="related-products-card">
                  <IndexCard product={product} />
                </div>
           )
          })}
              </ReactElasticCarousel>
        </div>
        </div>
        
        <div className="product-main-footer">
            <Footer></Footer>
        </div>
        </div>
    )
}
export default RelatedPage