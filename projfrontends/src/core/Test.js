// import React from 'react';
// import "../styles.scss"
// import { Link } from 'react-router-dom';
// import { signout } from '../auth/helper';
// const Test =() => {
//     return (
//        <header className="header">
//            <img src="flipkart.png" className="logo" alt=""/>
//            <form action="#" className="search">
//                <input type="text" placeholder="Search Items" className="search-input"/>
//                <button className="search-button">
//                   <svg className="search-icon">
//                       <use xlinkHref="sprite.svg#icon-search"></use> 
//                   </svg>
//                </button>
//            </form>
//            <nav className="user-nav">
// {/* home */}
        
//                   <Link   to="/">
//                   <div className="user-nav-icon-box">
//                         <svg className="user-nav-icon">
//                       <use xlinkHref="sprite.svg#icon-home2"></use> 
//                   </svg>
//                   </div>
//                   </Link>
              
// {/* user dashbord */}
// {isAutheticated() && isAutheticated().user.role === 0 && (
//           <Link  to="/user/dashboard"
//           >
//             <div className="user-nav-icon-box">
//                <svg className="user-nav-icon">
//                       <use xlinkHref="sprite.svg#icon-dashboard"></use> 
//                   </svg>
//                   <span className="user-nav-notification">7</span>
//                </div>
//           </Link>
//       )}

// {/* admin dashbord */}
// {isAutheticated() && isAutheticated().user.role === 1 && (
//         <Fragment>
//           <Link
           
//             to="/user/dashboard"
//           >
//              <div className="user-nav-icon-box">
//                <svg className="user-nav-icon">
//                       <use xlinkHref="sprite.svg#icon-dashboard"></use> 
//                   </svg>
//                   <span className="user-nav-notification">7</span>
//                </div>

//           </Link>
//           <Link
           
//             to="/admin/dashboard"
//           >
//             <div className="user-nav-icon-box">
//                <svg className="user-nav-icon">
//                       <use xlinkHref="sprite.svg#icon-dashboard"></use> 
//                   </svg>
//                   <span className="user-nav-notification">7</span>
//                </div>
//           </Link>
//         </Fragment>
        
//       )}  
               
// {/* cart */}
// <Link to="/cart" >
              

//                <div className="user-nav-icon-box">
//                <svg className="user-nav-icon">
//                       <use xlinkHref="sprite.svg#icon-cart"></use> 
//                   </svg>
//                   <span className="user-nav-notification">17</span>
//                </div>

//                </Link> 

// {/* profile */}
// {!isAutheticated() && (
//         <Fragment>
         
//             <Link to="/signup"
//             >
//               Signup
//             </Link>
//             <Link to="/signin"
//             >
//               Sign In
//             </Link>
//         </Fragment>
//       )}
//       {isAutheticated() && (
//         <div onClick={() => {
//             signout(() => {
//                 console.log("user sign out")
//             }) }} className="user-nav-user">
//                    <img src="user.png" className="user-nav-user-profile" alt=""/>
//                    <span className="user-nav-user-name">Name</span>
//                </div>
//       )}




              

//            </nav>
//        </header>
//     )
// }

// export default Test