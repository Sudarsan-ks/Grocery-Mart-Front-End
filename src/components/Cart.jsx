import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, editCart, deleteCart } from '../redux/slice';
import { API } from '../global';
import { useNavigate } from 'react-router-dom';

export function Cart() {

  const dispatch = useDispatch()
  const cartItem = useSelector((state) => state.grocery.cartItem)
  const cart = useSelector((state) => state.grocery.cart)
  const totalPrice = useSelector((state) => state.grocery.totalPrice)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const userID = user?._id

  useEffect(() => {
    const getcart = async () => {
      try {
        const response = await axios.get(`${API}/cart/getCart/${userID}`)
        dispatch(addCart(response.data))
      } catch (error) {
        console.log("Error in Fetch item details", error)
      }
    }
    getcart()
  }, [])

  const handleMinus = async (item) => {
    const itemID = item?._id
    const quantity = item?.quantity - 1
    try {
      const response = await axios.put(`${API}/cart/editItem/${itemID}`, { quantity })
      dispatch(editCart(response.data))
    } catch (error) {
      console.log("Error in updating item details", error)
    }
  }

  const handlePlus = async (item) => {
    const itemID = item?._id
    const quantity = item?.quantity + 1
    try {
      const response = await axios.put(`${API}/cart/editItem/${itemID}`, { quantity })
      dispatch(editCart(response.data))
    } catch (error) {
      console.log("Error in updating item details", error)
    }
  }

  const handleRemove = async (itemID) => {
    const cartID = cart?._id
    try {
      await axios.delete(`${API}/cart/deleteItem/${cartID}/${itemID}`)
      dispatch(deleteCart(itemID))
    } catch (error) {
      console.log("Error in Deleting item", error)
    }
  }

  return (
    <div className="cart">
      <h3>WELCOME TO GROCERY CART</h3>
      <div className="cartItems">
        {
          cartItem.length > 0 && cartItem.map((item) => (
            <div className="itemCard" key={item._id}>
              <div className="cardImage">
                <img src={item?.product?.image} alt={item?.product?.name} />
              </div>
              <div className="cardDetails">
                <div className="cardName">{item?.product?.name}</div>
                <div className="cardPrice">Price Per KG: <span><b>{item?.product?.pricePerKg}</b></span></div>
                <div className="cardQuantity">
                  <button className="minus" onClick={() => {
                    if (item?.quantity <= 1) {
                      alert("Quantity cannot be less than 1");
                    }
                    else {
                      handleMinus(item)
                    }
                  }}>-</button>
                  <span className="numberValue">{item.quantity}</span>
                  <button className="plus" onClick={() => handlePlus(item)}>+</button>
                </div>
                <div className="remove">
                  <button onClick={() => handleRemove(item?._id)} >Remove</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="totalprice">
        {
          cartItem.length > 0 ? (
            <>
              <h4>Total Price - <span><b>{totalPrice}</b></span></h4>
              <button onClick={() => {
                navigate("/payment")
              }} >Check Out</button>
            </>) :
            (
              <h4>Your cart is empty</h4>
            )
        }
      </div>
    </div>
  );
}



