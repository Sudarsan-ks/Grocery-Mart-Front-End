import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { API } from '../global'
import { useState } from 'react'

export function OrderDetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const { orderID } = location.state || ""
    const [orderdetail, setOrderdetail] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get(`${API}/order/getOrderDetails/${orderID}`);
                setOrderdetail(response.data);
            } catch (error) {
                console.error("Error while getting the order details:", error);
            }
        };
        getOrder();
    }, [orderID]);

    return (
        <div className='orderdetail' >
            <h4>ORDER DETAIL'S</h4>
            <p className='backhome' onClick={()=>navigate("/home")} >Back to <i className="fa fa-backward" aria-hidden="true"></i> <b>HOME PAGE</b></p>
                {
                    orderdetail ? (
                        <div className='detailsCard' >
                            <p>Order Date: <b>{new Date(orderdetail.orderDate).toLocaleDateString()}</b></p>
                            <p>Total Amount: <b>{orderdetail.totalAmount}</b></p>
                            <p className='orderstatus' >Status: <b>{orderdetail.status}</b></p>
                            <div className='itemdetails' >
                                <h5><b>ITEM DETAIL'S</b></h5>
                                {orderdetail?.items?.map((item, index) => (
                                    <div className='itemdetailsCard' key={index}>
                                        <p>Product: <b>{item?.product?.name}</b></p>
                                        <p>Quantity: <b>{item.quantity}</b></p>
                                        <p>Price: <b>{item.price}</b></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>...Loading</p>
                    )
                }
        </div>
    )
}

