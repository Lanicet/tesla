import React from 'react';
import { Dimensions,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator presentation="card" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
