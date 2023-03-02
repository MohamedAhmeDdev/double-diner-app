import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDateTime } from "../utils/functions";


const OrderItemList = ({ order, onCancelOrder ,handleDelete}) => {
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



    const MoreOption = ({orderId, onCancelOrder, handleDelete })=>{
        const handleCancelOrder = () => {
          onCancelOrder(orderId);
        };
  
        const handleDeleteOrder = () => {
          handleDelete(orderId);
        };
  
        return(
          <>
          <TouchableOpacity style={styles.cancel} onPress={handleCancelOrder}>
            <Text style={styles.cancelIcon}> <MaterialIcons name="cancel" size={40} color={"white"}/></Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.delete} onPress={handleDeleteOrder}>
          <Text style={styles.cancelIcon}> <AntDesign  name="delete" size={40} color={"white"}/></Text>
          </TouchableOpacity>
          </>
        )
    }
  
    const Delete = ({orderId, handleDelete })=>{
        const handleDeleteOrder = () => {
          handleDelete(orderId);
        };
    return(
          <TouchableOpacity style={styles.delete} onPress={handleDeleteOrder}>
            <Text style={styles.cancelIcon}> <AntDesign  name="delete" size={40} color={"white"}/></Text>
          </TouchableOpacity>
        )
    }



    return (
    <>
    {order.order_status === 'PENDING' ?(
        <Swipeable renderRightActions={() => (<MoreOption orderId={order.order_id} onCancelOrder={onCancelOrder} handleDelete={handleDelete} />)}>
            <View style={styles.orderContainer} key={order.order_id} showsVerticalScrollIndicator ={false}>
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
        </Swipeable>
        ):( 
             
        <Swipeable  renderRightActions={() => (<Delete orderId={order.order_id} handleDelete={handleDelete} />)}>
            <View style={styles.orderContainer} key={order.order_id}  showsVerticalScrollIndicator ={false}>
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
        </Swipeable>
    )}
    </>
 )
}

export default OrderItemList

const styles = StyleSheet.create({
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
      cancel:{
        backgroundColor: 'green',
        justifyContent: 'center',
        padding: 25,
      },
      delete:{
        backgroundColor: '#e53e3e',
        justifyContent: 'center',
        padding: 25,
      },  
})