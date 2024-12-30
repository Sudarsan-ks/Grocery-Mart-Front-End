import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../global';

export function EditGrocery() {

    const location = useLocation()
    const grocery = location.state.grocery
    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        name: grocery.name,
        category: grocery.category,
        pricePerKg: grocery.pricePerKg,
        image: grocery.image,
        rating: grocery.rating,
        description: grocery.description,
        availability: grocery.availability
    })
    const ID = grocery._id
    const token = localStorage.getItem("token")

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormdata((previous) => ({ ...previous, [name]: value }))
    }

    const handleCategory = (category) => {
        setFormdata((previous => ({ ...previous, category })))
    }

    const handleAvailability = (availability) => {
        setFormdata((previous => ({ ...previous, availability })))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.put(`${API}/grocery/editGroceryId/${ID}`, formdata, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            alert("Your Grocery updated Successfully")
            navigate("/home")
        } catch (error) {
            console.log("Error Updating Product", error)
        }
    }

    return (
        <div className='editGrocery'>
            <div className="edit-card">
                <h1>EDIT PRODUCT</h1>
                <Form onSubmit={handleSubmit} >
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control name='name' value={formdata.name} onChange={handleChange} aria-label="name" required />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={formdata.category || "Category"}
                            onSelect={handleCategory}
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item eventKey="Fruit and Vegetable" >Fruit and Vegetable</Dropdown.Item>
                            <Dropdown.Item eventKey="Bakery Items" >Bakery Items</Dropdown.Item>
                            <Dropdown.Item eventKey="Meat and Seafood" >Meat and Seafood</Dropdown.Item>
                            <Dropdown.Item eventKey="Pantry Staples" >Pantry Staples</Dropdown.Item>
                            <Dropdown.Item eventKey="Beverages" >Beverages</Dropdown.Item>
                            <Dropdown.Item eventKey="Snacks and Confectionery" >Snacks and Confectionery</Dropdown.Item>
                            <Dropdown.Item eventKey="Household Supplies" >Household Supplies</Dropdown.Item>
                            <Dropdown.Item eventKey="Baby Products" >Baby Products</Dropdown.Item>
                            <Dropdown.Item eventKey="Pet Supplies" >Pet Supplies</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control name='category' required readOnly value={formdata.category} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>PricePerKg</InputGroup.Text>
                        <Form.Control name='pricePerKg' value={formdata.pricePerKg} required onChange={handleChange} aria-label="pricePerKg" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Image</InputGroup.Text>
                        <Form.Control name='image' value={formdata.image} required onChange={handleChange} aria-label="image" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Rating</InputGroup.Text>
                        <Form.Control name='rating' value={formdata.rating} required onChange={handleChange} aria-label="rating" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control name='description' value={formdata.description} required onChange={handleChange} aria-label="description" />
                    </InputGroup>

                    <InputGroup className="mb-3">

                        <DropdownButton
                            variant="outline-secondary"
                            title={formdata.availability || "Availability"}
                            onSelect={handleAvailability}
                            id="input-group-dropdown-3"
                        >
                            <Dropdown.Item eventKey="In Stock" >In Stock</Dropdown.Item>
                            <Dropdown.Item eventKey="Out Of Stock" >Out Of Stock</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control name='availability' required readOnly value={formdata.availability} />
                    </InputGroup>
                    <div className="editCardBtn">
                        <Button type="submit" variant="secondary" >Update</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

