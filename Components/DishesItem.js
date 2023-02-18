import {StyleSheet, View, Text, Image, Button, SafeAreaView, ScrollView,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import {TouchableOpacity } from 'react-native-gesture-handler'
import axios from "axios";
import { SERVER_URL } from '../constant';
import { useNavigation } from '@react-navigation/native';


const DishesItem = ({category}) => {
  const [dishes, setDishes] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const URL = `${SERVER_URL}/dishes${category === "all" ? "" : `/list/?category=${category}`}`;
  
    const fetchDishes = async () => {
      try {
        const response = await axios.get(URL);
        const allDishes = response.data.dishes; 

  
        const availableDishes = allDishes.filter((dish) => dish.quantity > 0);
  
        const dishes = availableDishes.map((dish) => {
          return {
            ...dish,
            quantity: 1,
          };
        });
  
        setDishes(dishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
  
    fetchDishes();
  }, [category]);

  return (
    <SafeAreaView>
     
    <ScrollView>
     <View style={styles.container}>
     {dishes?.map((dish) => (
        <View  key={dish.id} style={styles.divContainer}>
          <TouchableOpacity key={dish.id} onPress={() => navigation.navigate('SingleDishes', { dishId: dish.id })}>
            <Image style={styles.image} source={{uri: `${SERVER_URL}/${dish?.image}`}}/>
            </TouchableOpacity>
            <View style={styles.info}>
            <Text style={styles.title}>{dish?.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>Ksh. {dish?.price}</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        ))}
     </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default DishesItem

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: "space-around",
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      flexWrap: "wrap",
      width: '100%'     
    },
    divContainer: {
        borderRadius: 8,
        backgroundColor: '#fff',
        width: "49%",
        height: 250,
        marginTop: 10,
      },
    image: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    info: {
      flex: 1,
      padding: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      marginBottom: 8,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    button: {
      marginTop: 8,
      backgroundColor: '#007AFF',
      padding: 8,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  