import React,{useEffect} from 'react';
import { View ,Text, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {BookmarksProvider} from './src/contexts/BookmarkContext'

// import SplashScreen from 'react-native-splash-screen';

const Stack=createNativeStackNavigator();

const App=()=>{

  // useEffect(() => {
  //   SplashScreen.hide(); // Hide the splash screen when app is ready
  // }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <BookmarksProvider>
      <NavigationContainer>
      <AppNavigator/>
      </NavigationContainer>
      </BookmarksProvider>
       
    </SafeAreaView>
  
  // <View>
  //   <Text>
  //     jwedhssssssssj
  //   </Text>
  // </View>
  // <View>
  //   <HomeScreen/>
  // </View>
  );
};
      

export default App;
