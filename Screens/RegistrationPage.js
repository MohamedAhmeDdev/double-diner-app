import React, { useState} from 'react'
import { SERVER_URL } from "../constant";
import axios from "axios";
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegistrationPage = () => {
  const[name, setName] =useState('')
  const[email, setEmail] =useState('')
  const[password, setPassword] =useState('')
  const navigation = useNavigation();
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 4){
    console.log("Password Must Be More Than 4")
  }
    else if (!regEx.test(email)){
    console.log("Incorrect Email (example@gmail.com)")
  }
    else if(
       await axios.post(`${SERVER_URL}/auth/signup`, {
        name: name,
        email: email,
        password: password,
      })
      )
      navigation.navigate('Login');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log("Username, email or password is missing"); 
      }
      if (error.response?.status === 401) {
        console.log("Email already exists");
      }
    }
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <TouchableWithoutFeedback   onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.form}>
        <Text style={styles.header}>SignUp</Text>

        <Text style={styles.textInput}>Name</Text>
        <TextInput style={styles.input} placeholder='name' onChangeText={(text) => setName(text)}/>

        <Text style={styles.textInput}>Email</Text>
        <TextInput style={styles.input} placeholder='example@gmail.com' onChangeText={(text) => setEmail(text)}/>

          <Text style={styles.textInput}>Password</Text>
          <TextInput   secureTextEntry={true} style={styles.input} placeholder='password' onChangeText={(text) => setPassword(text)} />

          <View style={styles.textContainer}>
            <Text style={styles.text}>Forgot Password?</Text>
            <Text onPress={() => navigation.navigate('login')} style={styles.text}>Login</Text>
          </View>

          <View style={styles.btnView}>
            <Button style={styles.btn} onPress={signup}  title='Submit' color='white'/>
          </View>
          
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RegistrationPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingTop: 40,
    borderRadius: 7,
    marginBottom: 90,
    height: 500,
    width: '90%',
    backgroundColor: 'white'
  },
  header:{
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textInput:{
    letterSpacing: 1,
    color: 'black',
    marginTop: 15,
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
  textContainer:{
    position: 'relative',
    top: 20,
   flexDirection: 'row',
   justifyContent: 'space-around',
   fontSize: 20,
  },
  text:{
    color: 'blue',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'blue'
  },
  btnView:{
    margin: 35,
    backgroundColor: '#007AFF',
  },
});