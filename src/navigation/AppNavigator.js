import { StyleSheet, Text, View } from 'react-native'
import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';



const Stack=createNativeStackNavigator();


const AppNavigator = () => {
  return (
  
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
   
    
  );
};

export default AppNavigator;
