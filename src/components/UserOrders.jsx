import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'

export function UserOrders() {

  const user = JSON.parse(localStorage.getItem('user'))
  const userID = user?._id
  const [order, setOrder] = useState([])
  const [address, setAddress] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(`${API}/order/getOrder/${userID}`)
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

  const handleDelete = async (orderID) => {
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
        {
          address ? (<>
            <p>{address.street},</p>
            <p>{address.city},</p>
            <p>{address.state},</p>
            <p>{address.country},</p>
            <p>{address.zip}</p>
          </>) : (
            <p>No Address Available</p>
          )
        }
      </div>
      <p className='backhome' onClick={() => navigate("/home")} >Back to <i className="fa fa-backward" aria-hidden="true"></i> <b>HOME PAGE</b></p>
      <div className="adminorders">
        {
          order.length > 0 ? (order.map((res) =>
          (
            <div className="orders" key={res?._id}>
              <div className="userName"><b>{res?.user?.name}</b></div>
              <div className="dateAmount">
                <p>Order Date: <b>{new Date(res?.orderDate).toLocaleDateString()}</b> </p>
                <p>Total Price: <b>{res?.totalAmount}</b></p>
              </div>
              <div className="statusbtn">
                <p style={{ backgroundColor: res?.status === "Pending" ? "red" : "green" }} ><b>{res?.status}</b></p>
              </div>
              <div className="deletelbtn">
                <button onClick={() => navigate("/orderdetails", { state: { orderID: res?._id } })} >More Details </button>
                {
                  (res?.status === "Delivered") && <i onClick={() => handleDelete(res?._id)} className="fa fa-trash" aria-hidden="true"></i>
                }
              </div>
            </div>
          )
          )) : (<p className='noOrder' ><b>No Orders Available</b></p>)
        }
      </div>
    </div>
  )
}


