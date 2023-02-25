import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SERVER_URL } from '../constant';
import { MaterialIcons } from '@expo/vector-icons';

const SingleDishes = () => {
  const { params: { dishId, dishName,dishDescription,dishPrice,dishImage }} = useRoute();
  const navigation = useNavigation()

  useLayoutEffect(() => {
   navigation.setOptions({
    headerShown: false
   })
  }, [])

  return (
    <View style={styles.container}>
        <Image source={{ uri: `${SERVER_URL}/${dishImage}` }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.dishName}>{dishName}</Text>
          <Text style={styles.description}>{dishDescription}</Text>
          <Text style={styles.price}>{`Price: Ksh. ${dishPrice}`}</Text>
        </View>
    </View>
  )
}

export default SingleDishes


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});