import { StyleSheet, Text, View ,Image} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';



const SplashScreen = () => {
    const navigation=useNavigation();
    useEffect(() => {
       
        const timer = setTimeout(() => {
          navigation.replace('Tab'); 
        }, 2000);
    
        
        return () => clearTimeout(timer);
      }, [navigation]);
  return (
    <View style={{height:'100%',backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
      <Image style={{height:100,width:100}}
            source={require('../assets/images/icon1.png')}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})