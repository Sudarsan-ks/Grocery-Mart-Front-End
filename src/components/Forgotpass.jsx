import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../global';

export function Forgotpass() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const trimemail = email.trim()

  const handleForgot = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/user/resendOtp`, { email: trimemail })
      alert("OTP Sended to Registered Email ID")
      navigate("/resetpass")
    } catch (error) {
      alert("Please Enter Your Registered Email ID")
      console.error("Invaild Email ID", error)
    }
  }

  return (
    <div className='forgot' >
      <div className="fotgot-form mt-5">
        <Form onSubmit={handleForgot} >
          <Form.Group className=" form-group mb-3" controlId="forgotEmail" >
            <Form.Label>Registered Email ID </Form.Label>
            <Form.Control name='email'
              type='text'
              placeholder='Enter you Email ID'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required >
            </Form.Control>
          </Form.Group>
          <div className="forgotbtn">
            <Button variant="primary" type="submit">
              Get OTP
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}


