import React from 'react';
import "../scss/styles.scss";

const Footer = () => {
    return(
        <div className="fconte">

        <div className="follow">
                  <div className="fmenu">
            <div className="flabel">Follow Me</div>
            <div className="fspacer"></div>
            <div className="fitem"><span>Instagram</span></div>
            <div className="fitem"><span>Twitter</span></div>
            <div className="fitem"><span>Facebook</span></div>
            <div className="fitem"><span>Youtube</span></div>
            <div className="fitem"><span>Github</span></div>
        </div>

        </div>


<div  className="fpayment">
  <img src={require('../images/upi.png')} alt=""/>
  <img src={require('../images/card.png')} alt=""/>
  <img src={require('../images/wallet.png')} alt=""/>
  <img src={require('../images/netBanking.png')} alt=""/>



</div>

</div>
    )
}
export default Footer ;