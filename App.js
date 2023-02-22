import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { CartContextProvider } from './context/CartContext';
import {  AuthContextProvider } from "./context/AuthContext";
import DrawerNavigation from './Components/DrawerNavigation';





export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <NavigationContainer>
          <DrawerNavigation/>
        </NavigationContainer>
      </CartContextProvider>
    </AuthContextProvider>
  );
}



