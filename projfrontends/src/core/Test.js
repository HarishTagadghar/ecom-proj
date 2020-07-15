import React , { useState , useEffect ,Fragment} from 'react';
import "../scss/styles.scss"
import { Link } from 'react-router-dom';
import { isAutheticated, signout } from '../auth/helper';
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import Testcart from './Testcart';
import { getProducts, getCategories } from '../admin/helper/adminapicall';
import { API } from '../backend';
import ImageHelper from './helper/ImageHelper';
import SideProduct from './SideProduct';


export default function Test() {

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

  



// carousel item
  
    
        return (
            <div className="hcontainer">
                <div className="sidebar">
                <h2 className="sidebar-title">Trending products</h2>
                {products.slice(0,5).map((product , index) => {
                  return (
                    <div key={product._id} className="">
                     <SideProduct product={product} />
                    </div>
                  )
                })}
                
                <img className="sidebar-image" src={require('../images/sidebar2.jpg')} alt=""/>
                <h2 className="sidebar-title">Top Rated</h2>
             
                {products.slice(6,11).map((product , index) => {
                  return (
                    <div key={product._id} className="">
                     <SideProduct product={product} />
                    </div>
                  )
                })}

                <img className="sidebar-image" src={require('../images/sidebar3.jpg')} alt=""/>
               
                </div>
             <div className="carousel">
         
             <div style={{height: '98%'}}>
              
              <Carousel loop auto  widgets={[Dots, Buttons]} className="custom-class">
                <img src={require('../images/slider1.jpg')} alt="" className="css"/>
                <img src={require('../images/slider2.jpg')} alt="" className="css"/>
                <img src={require('../images/slider3.jpg')} alt="" className="css"/>
               
      </Carousel>
            </div>
            
             </div>
             <div className="carousel-sidebar">
             <div>
               <img className="carousel-sidebar-image1" src={require('../images/banner2.jpg')} alt=""/>
               <img className="carousel-sidebar-image2" src={require('../images/banner3.jpg')} alt=""/>
             </div>
             </div>
                <div className="banner">
                   <img className="banner-image" src={require('../images/banner1.jpg')} alt=""/>
                </div>
             
                <div className="products">
                <h1 style={{width:"15%",paddingLeft:"2rem"}} className="sidebar-title">All products</h1>
                <div className="product">
                {products.map((product , index) => {
                  return (
                    <div key={product._id} className="">
                     <Testcart product={product} />
                    </div>
                  )
                })}
                </div>
               
                </div>
             
                {/* <div className="footer">
                <div class="fmenu">
                    <div class="flabel">Follow Me</div>
                    <div class="spacer"></div>
                    <div class="fitem"><span>Twitter</span></div>
                    <div class="fitem"><span>Instagram</span></div>
                    <div class="fitem"><span>FACEBOOK</span></div>
                    <div class="fitem"><span>YOUTUBE</span></div>
                </div>
                </div> */}
            </div>
                 )
      
  

}


/* 
row 60vh 6-min-content
column 1fr 24rem 25(8) 1fr
*/