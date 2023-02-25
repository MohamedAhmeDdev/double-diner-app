import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDateTime } from "../utils/functions";


const  OrderItem = ({ order }) => {
  const navigation = useNavigation();

    const formatItemsListToSting = (items = []) => {
      const itemsList = items.map((item) => item.name);
      if (itemsList.length > 3) {
        return (
          itemsList.slice(0, 3).join(", ") + ` + ${itemsList.length - 3}  more`
        );
      }
      return itemsList.join(", ");
    };
  
    const orderedItems = order?.dishes?.map((item) => item?.metadata);

return (
      <View style={styles.orderContainer} key={order.order_id} horizontal={true} showsVerticalScrollIndicator ={false}>
          <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
          <Text style={styles.price}>Total Price: Ksh {order.total_price}</Text>
          <Text style={styles.date}>{formatItemsListToSting(orderedItems)}</Text>
          <Text style={styles.dish}>Items: {formatDateTime(order.order_date)}</Text>
          {order.order_status === 'PENDING' ?<Text>Status: <Text style={ styles.orderStatusPending}>{order.order_status}</Text></Text> : 
          <Text>Status: <Text style={ styles.orderStatusComplete}>{order.order_status}</Text></Text> }

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('SingleOrder', { screen: 'SingleOrder', orderId: order.order_id })}>
            <View style={styles.icon}>
              <Fontisto name="more-v-a" size={24} color={"black"}/>
            </View>
          </TouchableOpacity>
       </View>
  )
};

const OdersItem = ({ orders }) => {
  
 return(
    <ScrollView style={styles.container}>
            {orders?.length > 0 ? (
                <>
                {orders.map((order) => (
                    <OrderItem  key={order.order_id} order={order}  />
                ))}
                </>
            ) : (
                <Text style={styles.text}>No Orders Found</Text>
            )}
    </ScrollView>
     )
}

export default OdersItem



const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    text:{
      fontSize: 16,
      textAlign: 'center',
      paddingTop: 50,
    },
    orderContainer: {
      paddingLeft: 25,
      backgroundColor: '#fff',
      padding: 10,
      shadowColor: '#000',
      elevation: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    orderId: {
      lineHeight: 25,
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    orderStatusPending: {
        lineHeight: 25,
       color: '#ff0000',
       fontWeight: 'bold',
    },
    date: {
        lineHeight: 25,
    },
    dish: {
      lineHeight: 25,
    },
    price: {
      lineHeight: 25,
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
      iconContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
        width: 50,
        height: 50,
        borderRadius: '50%',
        position: 'absolute',
        top: 25,
        right: 10,
      },
      icon:{
        justifyContent: 'center',
        alignItems: 'center'
      },
  });