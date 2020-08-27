import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls"
import { getCategoryById } from "./helper/categoryHelper"
import { getCategories } from "../admin/helper/adminapicall"
import Menu from "./Menu";
import Index from "./Index";
import Footer from "./Footer";

export default function Home() {

  const [products, setProducts] = useState([])
  const [errors, seterrors] = useState(false)
  const [categories, setCategory] = useState([])
  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        seterrors(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const preloadCategory = () => {
    getCategories().then(data => {
      if (data.error) {
        seterrors({ error: data.error });
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


  return (

    <div>
      <Menu />
      <Index />
      <Footer />
    </div>
  );
}

