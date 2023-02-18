import {StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import DishesItem from '../Components/DishesItem'
import React, { useState } from "react";

export const DISH_CATEGORIES = [
  { id: 0, name: "Full Menu", value: "all" },
  { id: 1, name: "Appetizer", value: "appetizer" },
  { id: 2, name: "Main Course", value: "maincourse" },
  { id: 3, name: "Dessert", value: "dessert" },
  { id: 4, name: "Beverage", value: "beverage" },
  { id: 5, name: "Side Dish", value: "sidedish" },
  { id: 6, name: "Salad", value: "salad" },
  { id: 7, name: "Drinks", value: "drinks" },
];


const TabItem = ({ dishCategory, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity style={[ styles.tabItem, activeTab === dishCategory.value && styles.activeTabItem]}
      onPress={() => setActiveTab(dishCategory.value)}
      >
      <Text
        style={[ styles.tabItemText, activeTab === dishCategory.value && styles.activeTabItemText ]}>
        {dishCategory.name}
      </Text>
    </TouchableOpacity>
  );
};



const Home = () => {
   const [activeTab, setActiveTab] = useState(DISH_CATEGORIES[0].value); 
  return (
      <View style={styles.homeContainer}>
        <View style={styles.navContainer}>
        <ScrollView horizontal={true}showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabListContainer}>
          {DISH_CATEGORIES.map((dishCategory) => (
            <TabItem key={dishCategory.id} dishCategory={dishCategory} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
          </ScrollView>
        </View>

        <View style={styles.dishesMenuContainer}>
        <DishesItem category={activeTab}></DishesItem>
        </View>
    </View>
  );
};

export default Home


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  tabListContainer: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  dishesMenuContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#3182ce',
  },
  tabItemText: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  activeTabItemText: {
    color: '#3182ce',
  },
});