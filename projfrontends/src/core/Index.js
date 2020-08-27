import React, { useState, useEffect, Fragment } from 'react';
import "../scss/styles.scss"
import { Link } from 'react-router-dom';
import { isAutheticated, signout } from '../auth/helper';
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import IndexCard from './IndexCard';
import Pagination from './Pagination';
import { getProducts, getCategories } from '../admin/helper/adminapicall';
import { API } from '../backend';
import ImageHelper from './helper/ImageHelper';
import SideProduct from './SideProduct';
import { getCategoryById } from './helper/categoryHelper';


export default function Index() {

  const [products, setProducts] = useState([])
  const [errors, seterrors] = useState(false)
  const [categories, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage, setProductPerPage] = useState(16)


  const preload = () => {
    setLoading(true)
    getProducts().then(data => {
      if (!data) {
        seterrors(true)
      } else {
        setProducts(data)
      }
    })
    setLoading(false)

  }

  useEffect(() => {
    preload()
  }, [])

  const preloadCategory = () => {
    getCategories().then(data => {
      if (!data) {
        seterrors(true);
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
        } else {
          setProducts(data)
        }
      })
    ) : (
        getCategoryById({ "_id": event.target.value }).then(data => {
          if (data.error) {
            seterrors(data.error)
          } else {
            setProducts(data)
          }
        })
      );

  }

  /// get current product pagination
  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPage - productPerPage;
  const currentProduct = products.slice(indexOfFirstPost, indexOfLastPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const pre = () => {
    setCurrentPage(currentPage - 1)
  }
  const next = () => {
    setCurrentPage(currentPage + 1)

  }
  // carousel item


  return (
    <div className="hcontainer">
      <div className="sidebar">
        <h2 className="sidebar-title">Trending products</h2>
        {products.slice(0, 5).map((product, index) => {
          return (
            <div key={product._id} className="">
              <SideProduct product={product} />
            </div>
          )
        })}

        <img className="sidebar-image" src={require('../images/sidebar2.jpg')} alt="" />

        <div className="b">
          <h2 className="sidebar-title ">Top Rated</h2>

          {products.slice(6, 11).map((product, index) => {
            return (
              <div key={product._id} className="">
                <SideProduct product={product} />
              </div>
            )
          })}

          <img className="sidebar-image" src={require('../images/sidebar3.jpg')} alt="" />
        </div>

      </div>
      <div className="carousel">

        <div style={{ height: '100%', width: '100%' }}>

          <Carousel loop auto widgets={[Dots, Buttons]} className="custom-class">
            <img src={require('../images/slider1.jpg')} alt="" className="css" />
            <img src={require('../images/slider2.jpg')} alt="" className="css" />
            <img src={require('../images/slider3.jpg')} alt="" className="css" />

          </Carousel>
        </div>

      </div>
      <div className="carousel-sidebar">
        <div className="carousel-sidebar-image1" style={{ backgroundImage: `url(${require('../images/banner2.jpg')})` }}></div>
        <div className="carousel-sidebar-image2" style={{ backgroundImage: `url(${require('../images/banner3.jpg')})` }}></div>

        {/*  <img className="carousel-sidebar-image1" src={require('../images/banner2.jpg')} alt=""/>
            <img className="carousel-sidebar-image2" src={require('../images/banner3.jpg')} alt=""/> */}

      </div>
      <div className="banner">
        <img className="banner-image" src={require('../images/banner1.jpg')} alt="" />
      </div>

      <div className="products">
        <h1 className="sidebar-title sidebar-title-2">All products</h1>


        <div className="cselect">
          <select
            onChange={handleChange}
            placeholder="Category"
          >
            <option className="options" value="all"> All Category  &#11167; </option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>





        <div className="product">

          {loading ? <h1>loading...</h1> : (
            currentProduct.map((product, index) => {
              return (

                <div key={product._id} className="">
                  <IndexCard product={product} />
                </div>


              )
            })
          )
          }


        </div>
        <div className="ppagination">
          <p className="ppagination-pre" onClick={pre}>&#8606;	</p>

          <Pagination productPerPage={productPerPage} totalProduct={products.length} paginate={paginate} />
          <p onClick={next}>	&#8608;</p>
        </div>
      </div>


    </div>
  )



}


/*
row 60vh 6-min-content
column 1fr 24rem 25(8) 1fr
*/