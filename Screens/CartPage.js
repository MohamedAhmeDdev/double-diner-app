import {StyleSheet, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';
import { UseCartContext } from "../Hook/UseCartHook";
import {TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

const CartPage = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateItemQuantity, clear } = UseCartContext();
  const totalPrice = cartItems.reduce( (price, item) => price + item.quantity * item.price, 0);

  return (
    <>
     {cartItems.length >= 1 && (
          <TouchableOpacity style={styles.removeBtn} onPress={clear}><Text style={styles.btnText}>Remove</Text></TouchableOpacity>
       )}
       <ScrollView showsVerticalScrollIndicator={false}>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          {/* <DataTable.Title style={styles.cell}>Image</DataTable.Title> */}
          <DataTable.Title style={styles.cell}>Dish</DataTable.Title>
          <DataTable.Title style={styles.cell}>Decrement</DataTable.Title>
          <DataTable.Title style={styles.cell}>quantity</DataTable.Title>
          <DataTable.Title style={styles.cell}>Increment</DataTable.Title>
          <DataTable.Title style={styles.cell}>price</DataTable.Title>
        </DataTable.Header>

        
        {cartItems.map((item, id) => (
            <DataTable.Row style={styles.row} key={id}>
                {/* <DataTable.Cell style={[styles.cell, styles.cellImage]}><Image source={{uri: `${SERVER_URL}/${item.image}`}} style={styles.image}/></DataTable.Cell> */}

                <DataTable.Cell style={styles.cell}>{item.name}</DataTable.Cell>
                
                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity style={styles.btnDecrement} onPress={() => {
                    if (item.quantity > 1) { updateItemQuantity({ id: item.id, quantity: item.quantity - 1 });
                    } else { removeFromCart(item.id); 
                      }}}
                  >
                  <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                </DataTable.Cell>

                <DataTable.Cell style={styles.cell}>{item.quantity}</DataTable.Cell>

                <DataTable.Cell style={styles.cell}>
                  <TouchableOpacity style={styles.btnIncrement} onPress={() => updateItemQuantity({id: item.id, quantity: item.quantity + 1})} >
                  <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </DataTable.Cell>

                <DataTable.Cell style={styles.cell}>{item.quantity} x {item.price}</DataTable.Cell>
             </DataTable.Row>
          ))} 
         
         {cartItems.length >= 1 && (
          <Text style={styles.totalPrice}>Total Price: ksh {totalPrice} </Text>
          )} 

          {cartItems.length >= 1 && (
          <TouchableOpacity style={styles.btnIncrement} onPress={() => navigation.navigate('CheckOut')} >
          <Text style={styles.btnText}>Proceed To CheckOut</Text>
          </TouchableOpacity>
          )} 
      </DataTable>

      <DataTable style={styles.container}>
      {cartItems.length === 0 && (
          <DataTable.Title style={styles.cell}>No item added to the cart</DataTable.Title>
      )}
      </DataTable>
      </ScrollView> 
    </>
);
}

export default CartPage


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    paddingBottom: 70,
  },
  tableHeader: {
    backgroundColor: "white", 
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "white", 
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  tableRow: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  tableRowText: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  cell: {
    flex: 1.5 ,
    color: 'white',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellImage: {
    alignItems: 'flex-start',
  },
  cellText: {
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    height: 50,
    width: 70,
  },
  btnDecrement:{
    marginTop: 8,
    backgroundColor: '#e53e3e',
    padding: 8,
    borderRadius: 4,
  },
  btnIncrement:{
    marginTop: 8,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  removeBtn:{
    margin: 20,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e53e3e',
  },
  btnText:{
    textAlign: 'center',
    color: 'white'
  }
});