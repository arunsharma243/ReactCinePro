import { StyleSheet, Text, View } from 'react-native'
import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import TopRatedMovies from '../screens/TopRatedMovies';
import UpcomingMovies from '../screens/UpcomingMovies';
import Loading from '../components/Loading';



const Stack=createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    
   <Stack.Navigator>
       
        <Stack.Screen 
        name="Homes"
        component={HomeScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="Movie"
        component={MovieScreen}
        options={{headerShown:false}}
        />
         <Stack.Screen 
        name="Upcoming"
        component={UpcomingMovies}
        options={{headerShown:false}}
        />
          <Stack.Screen 
        name="TopRated"
        component={TopRatedMovies}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="Person"
        component={PersonScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="Search"
        component={SearchScreen}
        options={{headerShown:false}}
        />
         <Stack.Screen 
        name="Bookmarks"
        component={BookmarkScreen}
        options={{headerShown:false}}
        />
         <Stack.Screen 
        name="loading"
        component={Loading}
        options={{headerShown:false}}
        />
       
    </Stack.Navigator>
  );
};

export default HomeNavigator;
