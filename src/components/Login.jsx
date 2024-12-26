import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { API } from '../global';

export function Login() {

  const navigate = useNavigate()
  const [showpass, setShowpass] = useState(false)
  const [loading, setLoading] = useState(false)

  const [logindata, setLogindata] = useState({
    password: '',
    phone: ''
  })

  const trimmedData = {
    phone: logindata.phone.trim(),
    password: logindata.password.trim()
  }

  const handleChange = (e) => {
    setLogindata({
      ...logindata, [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    localStorage.clear()
    const millSecond = 60 * 60 * 1000
    const expireTime = Date.now() + millSecond
    try {
      const response = await axios.post(`${API}/user/login`, trimmedData)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("expireTime", expireTime)
      alert("Login Successfully")
      navigate("/home")
    } catch (error) {
      console.error('Error Loginig in user:', error);
      alert('Invalid credential');
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='login' >
      <div className="login-form mt-5">
        <div className="loginheading">
          <p>Welocom to <span><b>GROCERY MART</b></span></p>
        </div>
        <Form onSubmit={handleLogin} >
          <Form.Group className="mb-3" controlId="loginPhone" >
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name='phone'
              type='text'
              placeholder='Enter you number'
              value={logindata.phone}
              onChange={handleChange}
              required >
            </Form.Control>
          </Form.Group>
          <Form.Group className="passwordIcon mb-3" controlId="loginPassword" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type={showpass ? "text" : "password"}
              placeholder='Enter you password'
              value={logindata.password}
              onChange={handleChange}
              required >
            </Form.Control>
            <i className={showpass ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => setShowpass(!showpass)} aria-hidden="true"></i>
          </Form.Group>
          <div className="forgotpasslink">
            <a onClick={() => navigate('/forgotpass')} style={{ cursor: 'pointer' }}>
              Forgot Password?
            </a>
          </div>
          <div className="loginbtn">
            <Button variant="primary" type="submit">
              {loading ? "Logging In..." : "Login"}
            </Button>
          </div>
          <div className="registerlink">
            <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
              <b>Register?</b>
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}


