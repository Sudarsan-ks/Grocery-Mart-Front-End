import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../global';


export function Otpverify() {

  const navigate = useNavigate()
  const [otpdata, setOtpdata] = useState({
    otp: '',
    email: ''
  })

  const handleChange = (e) => {
    setOtpdata({
      ...otpdata, [e.target.name]: e.target.value
    })
  }

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/user/verifyOtp`, otpdata)
      alert("Account acctivated successfully")
      navigate("/")
    } catch (error) {
      alert("Invaild or OTP expire")
      console.error("Error in verifying OTP", error)
    }

  }

  const handleResend = async () => {
    const email = prompt("Enter your Registered Email")
    try {
      await axios.post(`${API}/user/resendOtp`, { email })
      alert("OTP Sended to Registered Email ID")
    } catch (error) {
      alert("Please Enter Your Registered Email ID")
      console.error("Invaild Email ID", error)
    }

  }

  return (
    <div className='otpverify' >
      <div className="otpverify-form mt-5">
        <Form onSubmit={handleOtpVerify} >
          <Form.Group className="mb-3" controlId="otpverifyEmail" >
            <Form.Label>Email</Form.Label>
            <Form.Control name='email'
              type='text'
              placeholder='Enter you Email'
              value={otpdata.email}
              onChange={handleChange}
              required >
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="otpverifyOtp" >
            <Form.Label>OTP</Form.Label>
            <Form.Control name='otp'
              type='text'
              placeholder='Enter you OTP'
              value={otpdata.otp}
              onChange={handleChange}
              required >
            </Form.Control>
            <p>Or <b onClick={() => handleResend()} >Re-send</b></p>
          </Form.Group>

          <div className="lotpverifybtn">
            <Button variant="secondary" type="submit">
              Verify
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}


