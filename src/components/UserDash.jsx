import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../global'

export function UserDash() {

  const [product, setProduct] = useState("")
  const [inStock, setInStock] = useState("")
  const [outStock, setOutStock] = useState("")
  const [seasonal, setSeasonal] = useState("")

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
    getProductCount()
    getInStockCount()
    getOutStockCount()
    getSeasonalCount()
  }, [])

  return (
    <div className='userdash'>
      <div className="userDetails">
        <div className="details-card">
          <h3><b>Products</b></h3>
          <p>{product}</p>
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


