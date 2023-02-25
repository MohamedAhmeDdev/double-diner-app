import { createStackNavigator } from '@react-navigation/stack';
import SingleDishes from '../Screens/SingleDishes';
import Navbar from '../Components/Navbar';
import CheckOutPage from '../Screens/CheckOutPage';
import SingleOrder from '../Screens/SingleOrder';

const StackNavigation = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
       <Stack.Screen name="Double Diner" component={Navbar} />
       <Stack.Screen screenOptions={{headerTitle: " "}} name='SingleDishes' component={SingleDishes} />
       <Stack.Screen screenOptions={{headerTitle: " "}} name='CheckOut' component={CheckOutPage} />
       <Stack.Screen screenOptions={{headerTitle: " "}} name='SingleOrder' component={SingleOrder} />
    </Stack.Navigator>
  );
}

export default StackNavigation