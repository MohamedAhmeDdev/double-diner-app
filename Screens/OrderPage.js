import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/apiCall";
import OdersItem from '../Components/OdersItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { SERVER_URL } from "../constant";



const OrderPage = () => {
  const [orders, setOrders] = useState([]);


  const getToken = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = user ? JSON.parse(user).token : null;
      return token;
    } catch (error) {
      console.log(error);
    }
  };


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
    const data = await apiCall(`/orders/${order_id}`, "PATCH", {
      order_status: "CANCELLED",
    });

    if (data) {
      const updatedOrder = data.order;

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



  return (
    <View>
     <OdersItem  orders={orders} onCancelOrder={cancelOrder} />
    </View>
  )
}

export default OrderPage

