import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../global';

export function Resetpass() {

  const [resetdata, setResetdata] = useState({
    email: "",
    otp: "",
    password: ""
  })

  const trimmedData = {
    email: resetdata.email.trim(),
    otp: resetdata.otp.trim(),
    password: resetdata.password.trim()
  }

  const navigate = useNavigate()

  const [showpass, setShowpass] = useState(false)

  const handleChange = (e) => {
    setResetdata({
      ...resetdata, [e.target.name]: e.target.value
    })
  }

  const handleResetpass = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/user/resetPassword`, trimmedData)
      alert("Password Reseted Successfully")
      navigate("/")
    } catch (error) {
      console.error('Error resetting the password', error);
      alert('Invalid Email ID or OTP Expire');
    }
  }

  const handleResend = async () => {
    const email = prompt("Enter your Registered Email ID")
    try {
      await axios.post(`${API}/user/resendOtp`, { email })
      alert("OTP Sended to Registered Email ID")
    } catch (error) {
      alert("Please Enter Your Registered Email ID")
      console.error("Invaild Email ID", error)
    }
  }
  return (
    <div className='reset' >
      <div className="reset-form mt-5">
        <Form onSubmit={handleResetpass} >
          <Form.Group className="resetGroup mb-3" controlId="resetEmail" >
            <Form.Label>Email</Form.Label>
            <Form.Control name='email'
              type='text'
              placeholder='Enter you Email ID'
              value={resetdata.email}
              onChange={handleChange}
              required >
            </Form.Control>
          </Form.Group>
          <Form.Group className="resetGroup mb-3" controlId="resetOtp" >
            <Form.Label>OTP</Form.Label>
            <Form.Control name='otp'
              type='text'
              placeholder='Enter you OTP'
              value={resetdata.otp}
              onChange={handleChange}
              required >
            </Form.Control>
            <p>Or <b onClick={() => handleResend()} >Re-send</b></p>
          </Form.Group>
          <Form.Group className="passwordIcon resetGroup mb-3" controlId="resetPassword" >
            <Form.Label>New Password</Form.Label>
            <Form.Control name='password'
              type={showpass ? "text" : "password"}
              placeholder='Enter you password'
              value={resetdata.password}
              onChange={handleChange}
              required >
            </Form.Control>
            <i className={showpass ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => setShowpass(!showpass)} aria-hidden="true"></i>
          </Form.Group>
          <div className="resetpassbtn">
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}


