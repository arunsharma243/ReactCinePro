import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';


const { width, height } = Dimensions.get('window');
const Loading = () => {
  return (
    <View style={{height:height,width:width,position:'absolute',flexDirection:'row',justifyContent:'center',
        alignItems:'center',backgroundColor:'black'
    }}>
      <Progress.CircleSnail thickness={12} size={160} color='#FFD700'/>
    </View>
  )
}

export default Loading;

const styles = StyleSheet.create({})