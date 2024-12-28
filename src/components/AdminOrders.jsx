import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'

export function AdminOrders() {

  const user = JSON.parse(localStorage.getItem('user'))
  const userID = user?._id
  const [order, setOrder] = useState([])
  const [address, setAddress] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    alert(`Please Update the Pending "ORDER STATUS"`)
    const getOrder = async () => {
      try {
        const response = await axios.get(`${API}/order/getOrder`)
        setOrder(response.data)
      } catch (error) {
        console.log("Error in getting the order", error)
      }
    }
    const getAddress = async () => {
      try {
        const response = await axios.get(`${API}/address/get-address/${userID}`)
        setAddress(response.data.address)
      } catch (error) {
        console.log("Error in getting the order", error)
      }
    }

    if (userID) {
      getOrder()
      getAddress()
    }
  }, [userID])

  const handleStatus = async (orderID, status) => {
    try {
      await axios.put(`${API}/order/updateStatus/${orderID}`, { status })
      setOrder((pervstate) => pervstate.map((order) => order._id === orderID ? { ...order, status } : order))
    } catch (error) {
      console.log("Error in updating the Status", error)
    }
  }

  const handleDelete=async(orderID)=>{
    try {
      await axios.delete(`${API}/order/deleteorder/${orderID}`)
      setOrder((pervstate) => pervstate.filter((order) => order._id !== orderID))
    } catch (error) {
      console.log("Error in Deleting the Order", error)
    }
  }

  return (
    <div className='order'>
      <h1>YOUR ORDER'S</h1>
      <div className="address">
        <p>{address.street},</p>
        <p>{address.city},</p>
        <p>{address.state},</p>
        <p>{address.country},</p>
        <p>{address.zip}</p>
      </div>
      <div className="adminorders">
        {
          order.map((res) => {
            return (
              <div className="orders" key={res?._id}>
                <div className="userName"><b>{user?.name}</b></div>
                <div className="dateAmount">
                  <p>Order Date: <b>{new Date(res?.orderDate).toLocaleDateString()}</b> </p>
                  <p>Total Price: <b>{res?.totalAmount}</b></p>
                </div>
                <div className="statusbtn">
                  {
                    res?.status === "Pending" ? (<select className='selectbox' style={{ backgroundColor: res?.status === "Pending" ? "red" : "green" }} defaultValue={res?.status} onChange={(e) => handleStatus(res?._id, e.target.value)} >
                      <option value="Pending">PENDING</option>
                      <option value="Delivered">DELIVERED</option>
                    </select>) : (<p><b>DELIVERED</b></p>)
                  }
                </div>
                <div className="deletelbtn">
                  <button onClick={() => navigate("/orderdetails", { state: { orderID: res?._id } })} >More Details </button>
                  <i onClick={() => handleDelete(res?._id)} className="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


