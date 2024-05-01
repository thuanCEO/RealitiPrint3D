import React from 'react';
import "./header.scss";
import {AiOutlineFacebook,
        AiOutlineInstagram,
        AiOutlineLinkedin,
        AiOutlineUser
} from "react-icons/ai"
import {Link} from "react-router-dom";

export default function Header() {
  return (
      <div className="header-on-top">
        <div className="header-container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6 header-container-top-right">
              <ul>
                <li>
                  <Link to={""}>
                    <AiOutlineFacebook/>
                  </Link>
                 </li>
                <li>
                  <Link to={""}>
                    <AiOutlineInstagram/>
                  </Link>
                 </li>
                 <li>
                  <Link to={""}>
                    <AiOutlineLinkedin/>
                  </Link>
                 </li>   
                 <li>
                  <Link to={""}>
                    <AiOutlineUser/>   
                    <span className='span-login'>Đăng Nhập</span>   
                  </Link>
                   
                 </li>
                  
              </ul>
            </div>
          </div>
     
  
        </div>
        </div>
    );
  };