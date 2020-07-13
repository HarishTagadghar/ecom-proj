import React , { useState , useEffect ,Fragment} from 'react';
import "../scss/styles.scss"
import { Link } from 'react-router-dom';
import { isAutheticated, signout } from '../auth/helper';
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import Testcart from './Testcart';
import { getProducts, getCategories } from '../admin/helper/adminapicall';

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
                    sidebar
                </div>
             <div className="carousel">
         
             <div style={{height: '100%'}}>
              
              <Carousel loop auto  widgets={[Dots, Buttons]} className="custom-class">
                <p className="css" style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</p>
                <p className="css" style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</p>
                <p className="css" style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</p>
              </Carousel>
            </div>
            
             </div>
             <div className="carousel-sidebar">
                 carousel-sidebar
             </div>
                <div className="banner">
                    banner
                </div>
                <div className="products">
                {products.map((product , index) => {
                  return (
                    <div key={product._id} className="col-4 mb-4">
                     <Testcart product={product} />
                    </div>
                  )
                })}
               
                </div>
                <div className="products-2"
                >products-2
                </div>
                <div className="footer">
                    footer
                </div>
            </div>
                 )
      
  

}


/* 
row 60vh 6-min-content
column 1fr 24rem 25(8) 1fr
*/