import {StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Screens/Home';
import CartPage from '../Screens/CartPage';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { UseCartContext } from "../Hook/UseCartHook";

const Tab = createMaterialTopTabNavigator();

export default function Navbar() {
  const { cartItems } = UseCartContext();

    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle:{backgroundColor: "#24272e"},
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "white"
       }}>
        <Tab.Screen style={styles.navbar} 
          options={{tabBarIcon: ({ focused }) => ( <AntDesign name="home" size={24} color={focused ? 'white' : '#ccc'} /> )}}
          name="Home" component={HomeScreen} 
        />
        <Tab.Screen options={{
           tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Feather name="shopping-cart" size={24} color={focused ? 'white' : '#ccc'} />
              <View style={styles.countContainer}>
                <Text style={styles.count}>{cartItems.length}</Text>
              </View>
          </View>
           )}}
           name="Cart"  component={CartPage}
        />
      </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'yellow',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});