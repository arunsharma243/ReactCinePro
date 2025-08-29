import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";

export const deviceWidth = Dimensions.get("window").width;
const MatchingHelpModal = () => {
    console.log(deviceWidth)
  return (
    <View style={{width:deviceWidth-48,display:'flex',justifyContent:"center", alignItems:'center',borderRadius:16, backgroundColor:'red',position:'absolute'}}>
      <Image
        source={require("../assets/images/visual.png")}
        style={styles.image}
      />
      {/* <Text>jsdcnj</Text> */}
    </View>
  )
}

export default MatchingHelpModal

const styles = StyleSheet.create({
    image: {
        height:120,
        resizeMode: "contain",
        // position:'relative'
    }
})