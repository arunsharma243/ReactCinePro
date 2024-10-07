import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import BookmarkNavigator from './BookmarkNavigator';
import Icon from 'react-native-vector-icons/Ionicons'; 
const Tab=createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;
 
             if (route.name === 'Home') {
               iconName = focused ? 'home' : 'home-outline';
             } else if (route.name === 'Bookmark') {
               iconName = focused ? 'bookmark' : 'bookmark-outline';
             }
 
             // Return the icon component
             return <Icon name={iconName} size={size} color={color} />;
           },
           tabBarActiveTintColor: '#FFD700',
           tabBarInactiveTintColor: 'gray',
           tabBarStyle: {
             backgroundColor: 'black',  // Tab bar background color
             paddingBottom: 5,
           },
           tabBarLabelStyle: {
             fontSize: 12,
           },
         })}
         >
         <Tab.Screen 
         name="Home"
         component={HomeNavigator}
         options={{headerShown:false}}
        
         />
         <Tab.Screen 
         name="Bookmark"
         component={BookmarkNavigator}
         options={{headerShown:false}}
     
         />
         
     </Tab.Navigator>
     
  )
}

export default TabNavigator

const styles = StyleSheet.create({})