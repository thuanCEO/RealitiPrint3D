import React, { useState } from 'react';
import './loginPages.css';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaLock } from "react-icons/fa";


import bannerImage from '../../images/banner/banner-login-technology.png';
import icon_imageShop from '../../images/logo/realiti.png';
import icon_logo_google from '../../images/logo/google-icon.png';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === 'admin' && password.trim() === '123') {
      console.log('Login successful');
      setErrorMessage('');
      navigate('/home');
    } else {
      console.log('Login failed');
      setErrorMessage('Invalid username or password');
    }
  };
  return (
    <div >
      <div className="login-container-header">
        <div className='login-container-header-icon'>
          <img src={icon_imageShop} alt="Reality Print 3D" width="100px" height="38px" />
        </div>
        <div className='login-title-header'>
          <h1 className="login-title-header">Realities Print 3D</h1>
        </div>

      </div>
      <div className="login-container"> {/* Form Login */}
        <div className='login-banner'>
          <form className="login-form">    {/* Banner */}
            <img src={bannerImage} alt="RealitPrint 3D Banner" width="620px" height="435.1px" />
          </form>
        </div>
        <div className="login-box">        {/* Login */}
          <h1 className="login-title">Đăng nhập</h1>
          <form className="login-form">
            <div className="login-input-group">
              <input placeholder='Tên đăng nhập' type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
              <FaRegUserCircle className="icon" />
            </div>
            <div className="login-input-group">
              <input placeholder='Mật khẩu' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
              <FaLock className="icon" />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="container">
              <div className="password-recovery">
                <a href="/registration">Quên mật khẩu</a>
              </div>
              <div className="registration">
                <a href="/registration">Đăng ký</a>
              </div>
            </div>
            <br></br>
            <div className="login-button-group">
              <button type="button" onClick={handleLogin} className="login-button">
                Đăng Nhập
              </button>
            </div>
            <br></br>
            <div className="login-button-group">

              <button type="button" onClick={handleLogin} className="login-button">
                <img src={icon_logo_google} alt="login-button" width="26px" height="14px" />
                <span className='login-google-span'>Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
};

