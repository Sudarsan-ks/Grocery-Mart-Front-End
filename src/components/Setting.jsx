import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export function Setting() {

  const navigate = useNavigate()
  const [language, setLanguage] = useState("en")
  const handleLangChange = (event) => {
    setLanguage(event.target.value);
    document.documentElement.lang = event.target.value
  }

  return (
    <div className='setting'>
      <div className="settingCard">
        <h3><b>SETTINGS</b></h3>
        <div className="account">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Account Setting
            </Dropdown.Toggle>
            <Dropdown.Menu className='accountDropdown' >
              <Dropdown.Item onClick={() => navigate("/forgotpass")}>Forgot Password</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/otpverify")}>Verify OTP</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="language">
          <label htmlFor="language">Language:</label>
          <select value={language} onChange={handleLangChange} >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="notification">
          <label>
            <input type="checkbox" /> Enable Email Notifications
          </label>
        </div>
      </div>
    </div>
  )
}


