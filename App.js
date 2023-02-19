import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Reservation from './Screens/Reservation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './Screens/Profile';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Contact from './Screens/Contact';
import SingleDishes from './Screens/SingleDishes';
import Navbar from './Components/Navbar';
import { CartContextProvider } from './context/CartContext';


const Logout = ()=>{
  console.log('dd');
}


const Stack = createStackNavigator();
function DishesStack() {
  return (
    <Stack.Navigator screenOptions={{headerTitle: "DOUBLE DINER"}}>
       <Stack.Screen name="Double Diner" component={Navbar} />
       <Stack.Screen screenOptions={{headerTitle: " "}} name='SingleDishes' component={SingleDishes} />
    </Stack.Navigator>
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
                name="App" component={ DishesStack}  />
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
    <CartContextProvider>
    <NavigationContainer>
       <DrawerNavigator/>
    </NavigationContainer>
    </CartContextProvider>
  );
}



