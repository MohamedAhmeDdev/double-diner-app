import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/Home';
import CartPage from './Screens/CartPage';
import Reservation from './Screens/Reservation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './Screens/Profile';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Contact from './Screens/Contact';


const Logout = ()=>{
  console.log('dd');
}

const Tab = createMaterialTopTabNavigator();

function TopNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle:{backgroundColor: "#24272e"},
      tabBarInactiveTintColor: "white",
      tabBarActiveTintColor: "white"
    }} >
      <Tab.Screen style={styles.navbar} 
         options={{tabBarIcon: ({ focused, size }) => ( 
         <AntDesign name="home" size={24} color={focused ? 'white' : '#ccc'} />
        ),
        }}
          name="Home" component={HomeScreen} />
      <Tab.Screen 
        options={{
          tabBarBadge: () => <View style={styles.badgeContainer}><Text style={styles.badge}>3</Text></View>,
          tabBarBadgeStyle: {backgroundColor:'yellow'},
          tabBarIcon: ({ focused, size }) => ( 
        <Feather name="shopping-cart" size={24} color={focused ? 'white' : '#ccc'} />
          ),
        }}
       name="Cart" component={CartPage} />
      </Tab.Navigator>
    );
  }

const Drawer = createDrawerNavigator();

    function DrawerNavigator() {
      return (
        <Drawer.Navigator>
              <Drawer.Screen
                 options={{ headerTitle: "" , drawerIcon: ({ focused, size }) => ( 
                  <AntDesign name="home" size={24} color={focused ? 'blue' : '#ccc'} />
                  ),
                 }}
                name="App" component={TopNavigator}  />
              <Drawer.Screen 
                 options={{ drawerIcon: ({ focused, size }) => ( 
                 <AntDesign name="user" size={24} color={focused ? 'blue' : '#ccc'} />
                  ),
                 }}
                 name="Profile" component={Profile}/>
                <Drawer.Screen 
                  options={{ drawerIcon: ({ focused, size }) => ( 
                    <AntDesign name="calendar" size={24} color={focused ? 'blue' : '#ccc'} />
                    ),
                  }}
                  name="Reservation" component={Reservation}/>
                <Drawer.Screen 
                    options={{ drawerIcon: ({ focused, size }) => ( 
                    <MaterialIcons name="quick-contacts-dialer" size={24} color={focused ? 'blue' : '#ccc'} />
                    ),
                  }}
                  name="Contact" component={Contact} />
                <Drawer.Screen 
                  options={{ drawerIcon: ({ focused, size }) => ( 
                    <Feather name="log-out" size={24} color={focused ? 'blue' : '#ccc'} />
                    ),
                  }}
                  name="Logout" component={Logout} />
        </Drawer.Navigator>
      );
    }

export default function App() {
  return (
    <NavigationContainer>
       <DrawerNavigator/>
    </NavigationContainer>
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

