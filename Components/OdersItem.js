import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import OrderItemList from './OrderItemList'



const OdersItem = ({ orders , onCancelOrder, handleDelete}) => {
  
 return(
    <ScrollView style={styles.container}>
      {orders?.length > 0 ? (
        <>
         {orders.map((order) => (
            <OrderItemList  key={order.order_id} order={order} onCancelOrder={onCancelOrder} handleDelete={handleDelete}/>
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
  });