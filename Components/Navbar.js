import {StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Screens/Home';
import CartPage from '../Screens/CartPage';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

const Tab = createMaterialTopTabNavigator();

export default function Navbar() {

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
        <Tab.Screen 
          options={{
            tabBarBadge: () => <View style={styles.badgeContainer}><Text style={styles.badge}>3</Text></View>,
            tabBarBadgeStyle: {backgroundColor:'yellow'},
            tabBarIcon: ({ focused }) => ( <Feather name="shopping-cart" size={24} color={focused ? 'white' : '#ccc'} /> )}}
           name="Cart" component={CartPage}
          />
        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'yellow',
    padding: 3,
    borderRadius: 10,
  },
  badge: {
    color: 'black',
    fontSize: 10,
  },
});