import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Profile() {

  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  return (
    <div className='profilePage'>
      <div className="profile-card">
        <div className="profileImg"><i className="fa fa-user" aria-hidden="true"></i></div>
        <p><b>Name :</b><span><b>{user.name}</b></span></p>
        <p><b>Email :</b><span><b>{user.email}</b></span></p>
        <p><b>Phone :</b><span><b>{user.phone}</b></span></p>
        <p><b>Role :</b><span><b>{user.role}</b></span></p>
        <div className="profile-btn">
          <button onClick={() => navigate("/home")} >HOME</button>
        </div>
      </div>
    </div>
  )
}

