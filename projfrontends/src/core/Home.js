import React, {Fragment, useState, useEffect ,useRef  , Component} from "react";
import Menu from './Menu'
import Index from "./Index";
import Footer from "./Footer";

export default function Home() {
  const [loading , setLoading] = useState(false)

  return (

    <div onLoad={() => setLoading(true)} >
    
       {/* <div >
          {loading && (
            <div>
            <Menu />
          <Index />
          <Footer /> 
            </div>
          )}
      </div> */}
          <Menu />
          <Index />
          <Footer /> 
     { !loading &&
      <div className="pre-loader">
             <h1 className="pre-loader-name"> Loading....</h1>
      </div>}
    </div>
  );
}

