import React, { useState } from 'react'
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { API } from '../global';
import { useNavigate } from 'react-router-dom';

export function Register() {

  const navigate = useNavigate()
  const [showpass, setShowpass] = useState(false)
  const [loading, setLoading] = useState(false)

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    adminSecret: '',
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await axios.post(`${API}/user/register`, registerData)
      alert("Registered Successfully")
      alert("You will receive an OTP to activate your account from Email ID")
      navigate("/otpverify")
    } catch (error) {
      console.error('Error registering user:', error);
      alert('User Already Exist');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className='register' >
      <div className="register-form mt-5" >
        <div className="registerheading">
          <h2><b>REGISTER</b></h2>
        </div>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={registerData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="passwordIcon mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showpass ? "text" : "password"}
              name="password"
              placeholder="Enter a password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
            <i className={showpass ? "fa fa-eye" : "fa fa-eye-slash"} onClick={() => setShowpass(!showpass)} aria-hidden="true"></i>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={registerData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          {registerData.role === 'admin' && (
            <Form.Group className="mb-3" controlId="formAdminSecret">
              <Form.Label>Admin Secret Key</Form.Label>
              <Form.Control
                type="password"
                name="adminSecret"
                placeholder="Enter admin secret key"
                value={registerData.adminSecret}
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <div className="registerbtn">
            <Button variant="primary" type="submit">
              {loading ? "Registering" : "Register"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}


