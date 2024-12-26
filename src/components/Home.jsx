import React, { useEffect, useState } from 'react'
import logo1 from "../assets/home1.jpg"
import logo2 from "../assets/home2.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API } from '../global'
import { useSelector } from 'react-redux'


export function Home() {

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem("token")
  const [showprofile, setShowprofile] = useState(false)
  const [showsidebar, setShowsidebar] = useState(false)
  const [product, setProduct] = useState([])
  const [filterByCategory, setFilterByCategory] = useState("")
  const [searchItem, setSearchItem] = useState("")
  const [filteredProduct, setFilteredProduct] = useState([])
  const navigate = useNavigate()
  const cartItem = useSelector((state) => state.grocery.cartItem)

  useEffect(() => {
    const getproduct = async () => {
      try {
        const response = await axios.get(`${API}/grocery/getGrocery`)
        setProduct(response.data)
        setFilteredProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getproduct()
  }, [])

  const tokenExpire = () => {
    const expirtionTime = localStorage.getItem("expireTime")

    if (expirtionTime) {
      const remainigTime = Number(expirtionTime) - Date.now()

      if (remainigTime <= 0) {
        handleSessionExpire()
      }
      else {
        setTimeout(() => {
          handleSessionExpire()
        }, remainigTime)
      }
    }
  }

  const handleSessionExpire = () => {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    localStorage.removeItem("user")
    localStorage.setItem("sessionExpired", "true");
    navigate("/")
  };

  useEffect(() => {
    const handleStorgeEvent = (event) => {
      if (event.key === "sessionExpired" && event.newValue === "true") {
        localStorage.removeItem("sessionExpired");
        navigate("/");
      }
    }
    window.addEventListener("storage", handleStorgeEvent)
    tokenExpire()
    return () => {
      window.removeEventListener("storage", handleStorgeEvent)
    }
  }, [navigate])


  const handleFilterByCategory = (ItemCategory) => {
    setFilterByCategory(ItemCategory)
  }

  const handleSearchItem = (event) => {
    const value = event.target.value;
    setSearchItem(value)
  }

  useEffect(() => {
    const filteringGorceries = () => {
      const filtered = product.filter((item) => {
        const categoryFilter = filterByCategory ? item.category === filterByCategory : true
        const searchFilter = searchItem ? item.name.toLowerCase().includes(searchItem.toLowerCase())
          || item.category.toLowerCase().includes(searchItem.toLowerCase())
          || item.description.toLowerCase().includes(searchItem.toLowerCase()) : true
        return categoryFilter && searchFilter
      })
      setFilteredProduct(filtered)
    }
    filteringGorceries()
  }, [product, filterByCategory, searchItem])

  const addToCart = async (res) => {
    const cartdata = {
      userId: user?._id,
      productId: res?._id,
      quantity: 1
    }
    try {
      await axios.post(`${API}/cart/addCart`, cartdata, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      navigate("/cart")
    } catch (error) {
      console.log("Error in add to cart", error)
    }
  }

  const handleEdit = (res) => {
    navigate("/editgrocery", { state: { grocery: res } })
  }

  return (
    <div className='home'>
      <div className={`sidebar ${showsidebar ? "open" : "close"}`}>
        <div className="back-button">
          <i className="fa fa-times" aria-hidden="true" onClick={() => setShowsidebar(!showsidebar)} ></i>
        </div>
        <ul>
          <li onClick={() => setShowsidebar(!showsidebar)} ><i className="fa fa-home" aria-hidden="true"></i> Home</li>
          <li onClick={() => {
            if (user?.role === "admin") {
              navigate("/admindash")
            }
            else {
              navigate("/userdash")
            }
          }} ><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</li>
          <li onClick={() => {
            if (user?.role === "admin") {
              navigate("/adminorder")
            }
            else {
              navigate("/userorder")
            }
          }} ><i className="fa fa-suitcase" aria-hidden="true"></i>My Orders</li>
        </ul>
      </div>
      <div className="home-nav">
        <div className="sidebar-toggle">
          <i
            className="fa fa-sliders siderbarIcon"
            aria-hidden="true"
            onClick={() => setShowsidebar(!showsidebar)}
          ></i>
        </div>
        <div className="usernavigation">
          <i className="fa fa-user-circle userIcon" aria-hidden="true" onClick={() => setShowprofile(!showprofile)} ></i>
          <div className={`userprofile ${showprofile ? "open" : "close"}`}>
            <ul>
              <li onClick={() => navigate("/profile")} ><i className="fa fa-user" aria-hidden="true"></i> Profile</li>
              <li onClick={() => navigate("/setting")}  ><i className="fa fa-cog" aria-hidden="true"></i> Setting</li>
              <li onClick={() => navigate("/")}  ><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="home-search">
        <div className="grocery-logo">
          <img src={logo1} alt="img" />
        </div>
        <div className="search-bar">
          <label htmlFor="search"><b>Search</b></label>
          <input type="search" value={searchItem} onChange={handleSearchItem} />
        </div>
        <div className="nav-cart">
          <i className="fa fa-shopping-cart cartIcon" aria-hidden="true" onClick={() => {
            if (cartItem.length === 0) {
              alert("Please add product to view cart")
            }
            else {
              navigate("/cart")
            }
          }} ></i>
          <p>{cartItem.length}</p>
        </div>
        <div className="grocery-logo">
          <img src={logo2} alt="img" />
        </div>
      </div>
      <div className="grocery-category">
        <div className="category-title">
          <b>Select by category</b>
        </div>
        <div className="categories">
          <div className="category-card">
            <p onClick={() => handleFilterByCategory('')} ><b>All</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Fruit and Vegetable")} ><b>Fruit and Vegetable</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Dairy Products")} ><b>Dairy Products</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Bakery Items")} ><b>Bakery Items</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Meat and Seafood")} ><b>Meat and Seafood</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Pantry Staples")} ><b>Pantry Staples</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Snacks and Confectionery")} ><b>Snacks and Confectionery</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Beverages")} ><b>Beverages</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Household Supplies")} ><b>Household Supplies</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Baby Products")} ><b>Baby Products</b></p>
          </div>
          <div className="category-card">
            <p onClick={() => handleFilterByCategory("Pet Supplies")} ><b>Pet Supplies</b></p>
          </div>
        </div>
      </div>
      <div className="home-display">
        {
          filteredProduct.map((res) => {
            return (
              <div className="card" key={res._id}>
                <img src={res.image} alt={res.name} className="product-image" />
                <div className="card-details">
                  <h3><b>{res.name}</b></h3>
                  <p>{res.category}</p>
                  <p>Price: <span><b>₹{res.pricePerKg} /kg</b></span></p>
                  <p>Rating: {res.rating} ⭐</p>
                  <p><b>{res.description}</b></p>
                  <p>Availability: {res.availability}</p>
                </div>
                <div className="card-button">
                  <button type='buttton' onClick={() => addToCart(res)} >Add to Cart</button>
                </div>
                {
                  user?.role === "admin" &&
                  <div className="editButton">
                    <i className="fa fa-pencil editIcon" onClick={() => handleEdit(res)} aria-hidden="true"></i>
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}


