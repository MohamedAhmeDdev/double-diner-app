import { StyleSheet, Text, View, Image, ScrollView, TextInput,  Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState} from 'react'
import { UseCartContext } from "../Hook/UseCartHook";
import { UseAuthContext, } from "../Hook/UseAuthContext";
import { SERVER_URL } from '../constant';
import validator from "validator";
import { apiCall } from "../utils/apiCall";


const CheckOutPage = () => {
    const [phoneNo, setPhoneNo] = useState("254");
    const [address, setAddress] = useState("");
    const { cartItems, clear } = UseCartContext();
    const { user } = UseAuthContext();

    const total = cartItems.reduce( (acc, item) => acc + item.quantity * item.price, 0 );


    const placeOrder = (e) => {
        e.preventDefault();
    
        if (!phoneNo) {
          console.log("Please fill in your phone number");
          return;
        }
        if (!address) {
          console.log("Please fill in your address");
          return;
        }
        if (!validator.isMobilePhone(phoneNo, "en-KE")) {
          console.log("Please enter a valid phone number");
          return;
        }
    
        const order = {
          dishes: cartItems.map((item) => ({
            dish_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          delivery_address: address,
          delivery_phone: phoneNo,
        };
    
        apiCall("/orders", "POST", order)
          .then((res) => {
            console.log("Order placed successfully");
            clear()//its clears the cart
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.titleName}>{user.name}</Text> you are about to place an order for:</Text>
        <View style={styles.CartContainer}>
        {cartItems.map((item, id) => (
            <View key={id} style={styles.itemContainer}>
                <Image source={{uri: `${SERVER_URL}/${item.image}`}} style={styles.itemImage} /> 
                <View style={styles.container}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.quantity} x {item.price}</Text>
                </View>
            </View>
            ))}
        </View> 
        <Text style={styles.title}>Your Total is <Text style={styles.titleName}>Ksh.{total}</Text> /= payable on delivery</Text>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.header}>Please fill in Shipping Details</Text>

            <Text style={styles.textInput}>Phone Number</Text>
            <TextInput style={styles.input} placeholder='name'  onChangeText={(text) => setPhoneNo(text)}/>

            <Text style={styles.textInput}>Address</Text>
            <TextInput style={styles.input} placeholder='example@gmail.com'  onChangeText={(text) => setAddress(text)}/>

            <View style={styles.btnView}>
                <Button style={styles.btn} onPress={placeOrder}   title='Place Order' color='white'/>
            </View> 
        </View>
        </KeyboardAvoidingView>
        
  </View>
  </TouchableWithoutFeedback>
  </ScrollView>
  )
}

export default CheckOutPage

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title: {
        paddingTop: 20,
        fontSize: 15,
        textAlign: 'center'
      },
      titleName:{
        fontWeight: 'bold'
      },
    CartContainer: {
      paddingTop: 20,
      paddingLeft: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    itemImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    itemName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    itemPrice: {
      fontSize: 14,
      color: '#888',
    },
    form: {
        paddingTop: 40,
        marginLeft:20,
        marginTop: 50,
        borderRadius: 7,
        marginBottom: 90,
        height: 350,
        width: '90%',
        backgroundColor: 'white'
      },
      header:{
        letterSpacing: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      },
      textInput:{
        letterSpacing: 1,
        color: 'black',
        marginTop: 10,
        fontSize: 15,
        paddingLeft: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 15,
        marginTop: 20,
        marginLeft: 17,
        width: '90%',
        borderRadius: 9,
      },
      btnView:{
        margin: 35,
        backgroundColor: '#007AFF',
      },
  });

