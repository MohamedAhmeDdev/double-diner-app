import React, { useState} from 'react'
import { SERVER_URL } from "../constant";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseAuthContext } from "../Hook/UseAuthContext";

const LoginPage = () => {
  const[email, setEmail] =useState('')
  const[password, setPassword] =useState('')
  const[error, setError] =useState(false)
  const navigation = useNavigation();
  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/auth/login`, {
        email: email,
        password: password,
      })
      
      .then((response) => {
        const user = response.data.user;
  
        AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
        navigation.navigate('Home');
      });
    } catch (error) {
      if (error.response?.status === 400) {
        setError("Username or password is missing"); //send errors if you have not sing in
      } else if (error.response?.status === 401) {
        setError("Invalid login credentials"); // /send errors if password and email does not much
      }
    }
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
      <Text style={{ color: 'red' }}>{error}</Text>
    <TouchableWithoutFeedback   onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.form}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.textInput}>Email</Text>
          <TextInput style={styles.input} placeholder='example@gmail.com' onChangeText={(text) => setEmail(text)}/>

          <Text style={styles.textInput}>Password</Text>
          <TextInput style={styles.input} placeholder='password' onChangeText={(text) => setPassword(text)} />

          <View style={styles.textContainer}>
            <Text style={styles.text}>Forgot Password?</Text>
          </View>

          <View style={styles.btnView}>
            <Button style={styles.btn} onPress={login}  title='Login' color='white'/>
          </View>
          
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginPage

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
    height: 400,
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
   fontSize: 20,
   paddingLeft: 20
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