import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { SERVER_URL } from "../constant";

const Profile = ({userId, userName, userEmail}) => {
  const[name, setName] =useState(userName)
  const[email, setEmail] =useState(userEmail)
  const navigation = useNavigation();


  const update = async (e) => {
    try {
      e.preventDefault();
      if (!email || !name) {
        console.log("Fields Must Not Be Empty"); //send errors 
      } else {
        await axios.patch(`${SERVER_URL}/auth/${userId}`,{
          name: name,
          email: email
        })
        .then((response) => {
          let user = AsyncStorage.getItem("user");
          user.name = name;
          user.email = email;
          AsyncStorage.setItem('user', JSON.stringify(user));
          console.log('API response:', response.data);
          navigation.navigate('Home');
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

 
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <TouchableWithoutFeedback   onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.form}>
        <Text style={styles.header}>Update Profile</Text>

        <Text style={styles.textInput}>Name</Text>
        <TextInput style={styles.input} placeholder='name' value={userName} onChangeText={(text) => setName(text)}/>

        <Text style={styles.textInput}>Email</Text>
        <TextInput style={styles.input} placeholder='example@gmail.com' value={userEmail} onChangeText={(text) => setEmail(text)}/>

          <View style={styles.btnView}>
            <Button style={styles.btn} onPress={update}  title='Submit' color='white'/>
          </View>
          
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Profile

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
  btnView:{
    margin: 35,
    backgroundColor: '#007AFF',
  },
});