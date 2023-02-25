import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { UseAuthContext, } from "../Hook/UseAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Contact from '../Screens/Contact';
import RegistrationPage from '../Screens/RegistrationPage';
import LoginPage from '../Screens/Login';
import Reservation from '../Screens/Reservation';
import Profile from '../Screens/Profile';
import StackNavigation from './StackNavigation';
import {StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import OrderPage from '../Screens/OrderPage';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    const { user } = UseAuthContext();
    const { dispatch } = UseAuthContext();


    const Logout = ()=>{
        AsyncStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }


      const UserProfile = ()=>{
       return(
        <View style={styles.Profile}>
          <View style={styles.avatar}><Avatar size="medium" title={user? user.name.slice(0, 2).toUpperCase() : ''}/></View>
           <Text style={styles.userName}>{user.name}</Text>
        </View>
       )
      }

      const Navigation = (props) =>{
        return(
          <View style={{flex: 1}}>
            <View>
            <UserProfile/>
            </View>
            <DrawerContentScrollView>
              <DrawerItemList {...props}/>
            </DrawerContentScrollView>
          </View>
        )
      }


 return (
  <>
  {user ? (
      <Drawer.Navigator
      drawerContent={(props) => <Navigation {...props} />}
      screenOptions={{
        labelStyle: { fontWeight: 'bold', textTransform: 'uppercase', fontSize: 30 },
      }}
       >
           <Drawer.Screen options={{ headerTitle: "" , drawerIcon: ({ focused }) => ( 
              <AntDesign name="home" size={24} color={focused ? 'blue' : '#ccc'} />
            )}} name="App" component={StackNavigation } />
            
            <Drawer.Screen options={{ headerTitle: "",drawerIcon: ({ focused }) => (
               <AntDesign name="user" size={24} color={focused ? "blue" : "#ccc"}/>
             )}} name="Profile">{() => <Profile userId={user.id} userName={user.name} userEmail={user.email} />}
            </Drawer.Screen>

            <Drawer.Screen options={{ drawerIcon: ({ focused }) => ( 
                <FontAwesome name="history" size={24} color={focused ? 'blue' : '#ccc'} />
            )}} name="MyOrders" component={OrderPage}/>

            <Drawer.Screen options={{headerTitle: "" , drawerIcon: ({ focused }) => ( 
                <AntDesign name="calendar" size={24} color={focused ? 'blue' : '#ccc'} />
            )}} name="Reservation" component={Reservation}/>

            <Drawer.Screen options={{headerTitle: "" , drawerIcon: ({ focused }) => ( 
                <MaterialIcons name="quick-contacts-dialer" size={24} color={focused ? 'blue' : '#ccc'} />
             )}} name="Contact" component={Contact} />

            <Drawer.Screen options={{headerTitle: "" , drawerIcon: ({ focused }) => ( 
                <Feather name="log-out" size={24} color={focused ? 'blue' : '#ccc'} />
            )}} name="Logout" component={Logout} />
      </Drawer.Navigator>
    ) : (
      <Drawer.Navigator>
            <Drawer.Screen options={{ headerTitle: "" , drawerIcon: ({ focused }) => ( 
              <AntDesign name="home" size={24} color={focused ? 'blue' : '#ccc'} />
            )}} name="App" component={StackNavigation } />
              
            <Drawer.Screen options={{headerTitle: "" , drawerIcon: ({ focused }) => ( 
                  <MaterialIcons name="quick-contacts-dialer" size={24} color={focused ? 'blue' : '#ccc'} />
                )}} name="Contact" component={Contact} />

              <Drawer.Screen options={{ headerTitle: "", drawerIcon: ({ focused }) => ( 
                  <FontAwesome name="sign-out" size={24} color={focused ? 'blue' : '#ccc'} />
                )}} name="Login" component={LoginPage} />

              <Drawer.Screen options={{headerTitle: "" ,  drawerIcon: ({ focused }) => ( 
                  <FontAwesome name="sign-in" size={24} color={focused ? 'blue' : '#ccc'} />
                )}} name="signup" component={RegistrationPage} />
      </Drawer.Navigator>
    )}
      </>
  );
}

export default DrawerNavigation


const styles = StyleSheet.create({
  Profile: {
    height: 200,
    marginTop: 65,
    padding: 20,
    backgroundColor: '#BDCDD6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: 'gray',
    marginRight: 10,
  },
  userName:{
    paddingTop: 10,
    color: 'white',
    fontSize: 17,
    textTransform: 'uppercase'
   },
});