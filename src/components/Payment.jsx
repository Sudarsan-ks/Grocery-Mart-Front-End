import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API } from '../global'

export function Payment() {

    const totalPrice = useSelector((state) => state.grocery.totalPrice)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user?._id
    const role = user?.role

    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    })
    const [availableAddress, setAvailableAddress] = useState(false)

    const handleChange = (e) => {
        setAddress({
            ...address, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const getaddress = async () => {
            try {
                const response = await axios.get(`${API}/address/get-address/${userID}`)
                if (response.data?.address) {
                    setAddress(response.data.address)
                    setAvailableAddress(true)
                }
                else {
                    setAvailableAddress(false)
                }
            } catch (error) {
                console.log("Error getting the address", error)
                setAvailableAddress(false)
            }
        }
        getaddress()
    }, [userID])

    const handlePay = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!availableAddress) {
                const addressData = { ...address, user: userID }
                await axios.post(`${API}/address/add-address`, addressData)
            }
            const response = await axios.post(`${API}/order/payment`, { userID })
            const { orderId, amount, currency } = response.data
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: "Grocery Mart",
                description: "Grocery items",
                order_id: orderId,
                handler: async (response) => {
                    try {
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response
                        const verifyPay = await axios.post(`${API}/order/verifyPayment`, { razorpay_payment_id, razorpay_order_id, razorpay_signature });
                        console.log('Payment successful:', verifyPay);
                        alert("Payment Successful")
                        if (role === "admin") {
                            navigate("/adminorder")
                        }
                        else {
                            navigate("/userorder")
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment Failed please try again")
                        navigate('/payment');
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phone,
                },
                theme: {
                    color: "#3399cc",
                },
            }
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch (error) {
            console.log("Error while updating Payment", error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="payment" >
            <div className="paymentCard">
                <h3>Delivery Address</h3>
                <form onSubmit={handlePay}>
                    <div className="street">
                        <label htmlFor="street">Street:</label><br />
                        <input type="text" id="street" name="street" placeholder='Street Name' onChange={handleChange} value={address.street} required />
                    </div>
                    <div className="cityState">
                        <label htmlFor="city">City:</label><br />
                        <input type="text" id="city" name="city" placeholder='City' onChange={handleChange} value={address.city} required /><br />
                        <label htmlFor="state">State:</label><br />
                        <input type="text" id="state" name="state" placeholder='State' onChange={handleChange} value={address.state} required />
                    </div>
                    <div className="ZipCountry">
                        <label htmlFor="zip">Zip Code:</label><br />
                        <input type="text" id="zip" name="zip" placeholder='000000' onChange={handleChange} value={address.zip} required /><br />
                        <label htmlFor="country">Country:</label><br />
                        <input type="text" id="country" name="country" placeholder='Country' onChange={handleChange} value={address.country} required />
                    </div>
                    <div className="changeadd">
                        <button className='updateaddress' onClick={() => navigate("/changeaddress")}>CHANGE ADDRESS</button>
                    </div>
                    <div className="price">
                        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                    </div>
                    <button className="payButton" type="submit" disabled={loading} >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>
            </div>
        </div>
    )
}


