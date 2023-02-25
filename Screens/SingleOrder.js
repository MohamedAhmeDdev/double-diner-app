import { ScrollView, StyleSheet, Text, View,  TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState ,useLayoutEffect} from "react";
import { SERVER_URL } from '../constant';
import axios from "axios";
import { getToken } from "../utils/getToken";
import { MaterialIcons } from '@expo/vector-icons';


const SingleOrder = () => {
    const [order, setOrder] = useState({});
    const { params: {orderId}} = useRoute();
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
       headerShown: false
      })
     }, [])


      useEffect(() => {
        const getOrder = async () => {
          try {
            const token = await  getToken();
            const headers = { Authorization: `${token}` };
      
            const response  = await axios.get(`${SERVER_URL}/orders/${orderId}`, { headers });

            const data = response.data;
            if (data) {
              setOrder(data.order);
            }
          } catch (error) {
            console.error(error);
          }
        };
        getOrder();
      }, [orderId]);
      

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MyOrders')}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

      <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
      <View style={styles.orderContainer}>
        <Text style={styles.orderHeader}>User ID: <Text style={styles.orderText}>{order.user_id}</Text></Text>
        <Text style={styles.orderHeader}>delivery_phone: <Text style={styles.orderText}>{order.delivery_phone}</Text></Text>
        <Text style={styles.orderHeader}>delivery_address: <Text style={styles.orderText}>{order.delivery_address}</Text></Text>
        {order.order_status === 'PENDING' ?<Text style={styles.orderHeader}>Status: <Text style={ styles.orderStatusPending}>{order.order_status}</Text></Text> : 
        <Text style={styles.orderHeader}>Status: <Text style={ styles.orderStatusComplete}>{order.order_status}</Text></Text> }
        <Text style={styles.orderHeader}>Total Price: ksh <Text style={styles.orderText}>{order.total_price}</Text></Text>
      </View>
    </ScrollView>
  )
}

export default SingleOrder

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  orderContainer: {
    paddingLeft: 35,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  orderId: {
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  orderText: {
    lineHeight: 25,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  orderHeader: {
    lineHeight: 25,
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatusPending: {
      lineHeight: 25,
     color: '#ff0000',
     fontWeight: 'bold',
  },
  orderStatusPending: {
      lineHeight: 25,
     color: '#ff0000',
     fontWeight: 'bold',
  },
  orderStatusComplete: {
      lineHeight: 25, 
      color: 'green',
      fontWeight: 'bold',
    },
})