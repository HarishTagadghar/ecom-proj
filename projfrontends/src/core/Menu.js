import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import "../scss/styles.scss"
import { loadCart } from "./helper/cartHelper";
import { getUserOrders } from "../user/helper/userapicalls";
import { Dropdown } from 'react-bootstrap'




const Menu = ({ history }) => {
  // cart items length
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(true)

  useEffect(() => {
    if (!loadCart()) {
      return setCart(cart.length = [])
    }
    setCart(loadCart())
  }, [])
  // orders length

  let name
  if (isAutheticated()) {
    if (isAutheticated().user.name.length > 7) {
      name = `${isAutheticated().user.name.slice(0, 7)}...`
    } else {
      name = isAutheticated().user.name
    }
  }
  const [orders, setOrders] = useState([])

  let preload = (userId, token) => {
    getUserOrders(userId, token).then(order => {

      if (!order) {
        setOrders(0)
      } else {
        setOrders(order)
      }

    })
  }

  useEffect(() => {
    if (isAutheticated()) {
      preload(isAutheticated().user._id, isAutheticated().token)
    }

  }, [])


  return (

    <div>
      <header className="header">
        <img src={require("../images/logo.png")} className="logo" alt="" />
        <form action="#" className="search">
          <input type="text" placeholder="Search Items" className="search-input" />
          <button className="search-button">
            <img src={require("../images/SVG/search.svg")} className="search-icon" alt="" />

          </button>
        </form>
        <nav className="user-nav">
          {/* home */}

          <Link to="/">
            <div className="user-nav-icon-box">
              <img src={require("../images/SVG/home2.svg")} className="user-nav-icon" alt="" />
            </div>
          </Link>



          {/* user dashbord */}
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <Link to="/user/dashboard"
            >
              <div className="user-nav-icon-box">
                <img src={require("../images/SVG/dashboard.svg")} className="user-nav-icon" alt="" />
                <span className="user-nav-notification">{orders.length}</span>
              </div>
            </Link>
          )}

          {/* admin dashbord */}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <Fragment>
              <Link

                to="/user/dashboard"
              >
                <div className="user-nav-icon-box">
                  <img src={require("../images/SVG/dashboard.svg")} className="user-nav-icon" alt="" />

                  <span className="user-nav-notification">{orders.length}</span>
                </div>

              </Link>
              <Link

                to="/admin/dashboard"
              >
                <div className="user-nav-icon-box">
                  <img src={require("../images/SVG/user-tie.svg")} className="user-nav-icon" alt="" />


                </div>
              </Link>
            </Fragment>

          )}

          {/* cart */}
          <Link to="/cart" >


            <div className="user-nav-icon-box">
              <img src={require("../images/SVG/cart.svg")} className="user-nav-icon" alt="" />

              <span className="user-nav-notification">{cart.length}</span>
            </div>

          </Link>

          {/* profile */}
          {!isAutheticated() && (
            <Fragment>

              <Link to="/signup"
                className="authenticate"
              >
                Signup
   </Link>

              <Link to="/signin"
                className="authenticate"

              >
                Sign In
   </Link>
            </Fragment>
          )}
          {isAutheticated() && (
            <Dropdown>
              <Dropdown.Toggle className="ndropdown" id="dropdown-basic">

                <img src={require("../images/user.png")} className="user-nav-user-profile" alt="" />
                <span className="ndropdown-name">{name}</span>

              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="ndropdown-item" >
                  <Link to={"/user/update/" + isAutheticated().user._id}>
                    <div className="user-nav-user">
                      <span className="ndropdown-item-update">Update Profile</span>
                    </div>

                  </Link>
                </Dropdown.Item>

                <Dropdown.Item onClick={() => {
                  signout(() => {
                    history.push("/")
                  });
                }} className="ndropdown-item">
                  <span
                    className="ndropdown-item-signout"

                  >
                    Signout
 </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          )}





        </nav>
      </header>

    </div>
  )
}

export default withRouter(Menu);
