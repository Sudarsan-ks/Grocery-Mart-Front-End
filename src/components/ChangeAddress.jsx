import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'

export function ChangeAddress() {

    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user?._id
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    })

    const handleChange = (e) => {
        setAddress({
            ...address, [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const addressdata = { ...address, user: userID }
            await axios.put(`${API}/address/put-address/${userID}`, addressdata)
            alert("Address changed Successfully")
            navigate("/payment")
        } catch (error) {
            console.log("Error in updating new address", error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='changeaddress'>
            <div className="paymentCard">
                <h3>Update Your Address</h3>
                <form onSubmit={handlesubmit}>
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
                    <button className="payButton" type="submit" disabled={loading} >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    )
}

