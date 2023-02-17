import {StyleSheet, View, Text, Image, Button, SafeAreaView, ScrollView,  } from 'react-native'
import React from 'react'
import {TouchableOpacity } from 'react-native-gesture-handler'


const DishesItem = () => {
  return (
    <SafeAreaView>
    <ScrollView>
     <View style={styles.container}>
        <View style={styles.divContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <View style={styles.info}>
            <Text style={styles.title}>Product Name</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$19.99</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>

        <View style={styles.divContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <View style={styles.info}>
            <Text style={styles.title}>Product Name</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$19.99</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        <View style={styles.divContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <View style={styles.info}>
            <Text style={styles.title}>Product Name</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$19.99</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>

        <View style={styles.divContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <View style={styles.info}>
            <Text style={styles.title}>Product Name</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$19.99</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>

        <View style={styles.divContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <View style={styles.info}>
            <Text style={styles.title}>Product Name</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>$19.99</Text>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
  
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
      height: '60%',
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
  