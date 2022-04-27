import React from "react"
import "./Footer.scss"
import LogoIcon from "Assets/Images/game_logo.png"

export default function Footer(props: {}) {
  return (
    <div className="footer">
      <div className="container">
        <div className="icon">
          <div className="mui-content iconBox">
            <div className="mui-row iconBoxRow">
              <div className="mui-col-xs-12 iconBoxRowCol">
                <img src={LogoIcon} alt="logo" style={{width: "181px", opacity: 0.4}} />
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="contact">
            <span className="title">CONTACT:</span>
            <a className="email" href="email:">support@dragonairennfts.com</a>
          </div>
          <div className="links">
            <a href="./">Privacy Policy</a>
            <a href="./">Terms of use</a>
            <a href="./">FAQs</a>
          </div>
          <div className="copyright">
            Copyright@2022 Dragonaire. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
