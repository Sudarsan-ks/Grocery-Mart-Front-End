import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { API } from '../global';
import { useNavigate } from 'react-router-dom';

export function AdminDash() {

  const [formdata, setFormdata] = useState({
    name: '',
    category: '',
    pricePerKg: '',
    image: '',
    rating: '',
    description: '',
    availability: ''
  })

  const [user, setUser] = useState("")
  const [product, setProduct] = useState("")
  const [inStock, setInStock] = useState("")
  const [outStock, setOutStock] = useState("")
  const [seasonal, setSeasonal] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

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
      await axios.post(`${API}/grocery/addGrocery`, formdata, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      navigate("/home")
    } catch (error) {
      console.error("Error in adding the Grocery", error)
    }
    console.log(formdata)
  }

  const getUserCount = async () => {
    try {
      const response = await axios.get(`${API}/user/userCount`)
      setUser(response.data.count)
    } catch (error) {
      console.log("Error Getting User Count", error)
    }
  }
  const getProductCount = async () => {
    try {
      const response = await axios.get(`${API}/grocery/productCount`)
      setProduct(response.data.count)
    } catch (error) {
      console.log("Error Getting Product Count", error)
    }
  }
  const getInStockCount = async () => {
    try {
      const response = await axios.get(`${API}/grocery/InStock`)
      setInStock(response.data.count)
    } catch (error) {
      console.log("Error Getting InStock Count", error)
    }
  }
  const getOutStockCount = async () => {
    try {
      const response = await axios.get(`${API}/grocery/outOfStock`)
      setOutStock(response.data.count)
    } catch (error) {
      console.log("Error Getting OutStock Count", error)
    }
  }

  const getSeasonalCount = async () => {
    try {
      const response = await axios.get(`${API}/grocery/seasonal`)
      setSeasonal(response.data.count)
    } catch (error) {
      console.log("Error Getting Seasonal Count", error)
    }
  }

  useEffect(() => {
    getUserCount()
    getProductCount()
    getInStockCount()
    getOutStockCount()
    getSeasonalCount()
  }, [])


  return (
    <div className='adminDash'>
      <div className="addProduct">
        <div className="addproduct-card">
          <h1>ADD PRODUCT</h1>
          <Form onSubmit={handleSubmit} >
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control name='name' onChange={handleChange} aria-label="name" required />
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
              <Form.Control name='pricePerKg' required onChange={handleChange} aria-label="pricePerKg" />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <Form.Control name='image' required onChange={handleChange} aria-label="image" />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Rating</InputGroup.Text>
              <Form.Control name='rating' required onChange={handleChange} aria-label="rating" />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control name='description' required onChange={handleChange} aria-label="description" />
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
            <div className="addproductBtn">
              <Button type="submit" variant="primary">Add Product</Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="details">
        <div className="details-card">
          <h3><b>Products</b></h3>
          <p>{product}</p>
        </div>
        <div className="details-card">
          <h3><b>Users</b></h3>
          <p>{user}</p>
        </div>
        <div className="details-card">
          <h3><b>In Stocks</b></h3>
          <p>{inStock}</p>
        </div>
        <div className="details-card">
          <h3><b>Out Of Stocks</b></h3>
          <p>{outStock}</p>
        </div>
        <div className="details-card">
          <h3><b>Seasonal</b></h3>
          <p>{seasonal}</p>
        </div>
      </div>
    </div>
  )
}


