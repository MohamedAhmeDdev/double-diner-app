import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import OdersItem from '../Components/OdersItem';
import axios from "axios";
import { SERVER_URL } from "../constant";



const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = await getToken();
        const headers = { Authorization: `${token}` };
        const response = await axios.get(`${SERVER_URL}/orders`, { headers })
        if (response) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);


  const cancelOrder = async (order_id) => {
      const token = await getToken();
      const headers = { Authorization: `${token}` };
      const response = await axios.patch(`${SERVER_URL}/orders/${order_id}`, { order_status: "CANCELLED" }, { headers });

      if (response) {
        const updatedOrder = response.data.order;
        
        setOrders((prevOrders) => {
          return prevOrders.map((order) => {
            if (order.order_id === updatedOrder.order_id) {
              return updatedOrder;
            }
            return order;
          });
        });
        }
  };


  const handleDelete = async (order_id) => {
    const token = await getToken();
    const headers = { Authorization: `${token}` };
    const response = await axios.delete(`${SERVER_URL}/orders/${order_id}`, { headers })
      .then((response) => {
        setOrders((items) => items.filter((item) => item.id !== id));
        console.log("Order Deleted");
      })
      .catch((error) => {
        console.error(error);
      });
  };
    



  return (
    <View>
     <OdersItem  orders={orders} onCancelOrder={cancelOrder} handleDelete={handleDelete}/>
    </View>
  )
}

export default OrderPage

