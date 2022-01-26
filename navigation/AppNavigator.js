import React from 'react';
import { Dimensions,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Logo from '../components/Logo';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator presentation="card" >
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen name="Details"  options={{ title: <Logo color="#070405"/>, }}  component={Details} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
