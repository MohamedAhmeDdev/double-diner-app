import { createStackNavigator } from '@react-navigation/stack';
import SingleDishes from '../Screens/SingleDishes';
import Navbar from '../Components/Navbar';

const StackNavigation = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerTitle: "DOUBLE DINER"}}>
       <Stack.Screen name="Double Diner" component={Navbar} />
       <Stack.Screen screenOptions={{headerTitle: " "}} name='SingleDishes' component={SingleDishes} />
    </Stack.Navigator>
  );
}

export default StackNavigation