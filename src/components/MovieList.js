import { StyleSheet, Text, TouchableWithoutFeedback, View,ScrollView,Image,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../api/moviedb'

const MovieList = ({title,data,hideSeeAll}) => {
  const navigation=useNavigation();
  const { width, height } = Dimensions.get('window');
  let movieName="Avengers: Endgame";

  const handleSeeAll=()=>{
    if(title==='Upcoming')
    {
    navigation.navigate('Upcoming',{data:data,title:title})
    }
    else{
      navigation.navigate('TopRated',{data:data,title:title})
    }

  }
  return (
    <View style={{marginBottom:32,marginTop:16}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        {
          !hideSeeAll &&(
            <TouchableOpacity onPress={()=>handleSeeAll()}>
            <Text style={styles.text}>See All</Text>
          </TouchableOpacity>
          )
       }
       
      </View>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      >
        {
          data.map((item,index)=>{
            return(
              <TouchableWithoutFeedback
              key={index}
              onPress={()=>navigation.push('Movie',item)}
              >
                <View style={{marginRight:20}}>
                  <Image
                  source={{uri:image185(item.poster_path)}}
                  style={{borderRadius:20,width:width*0.33,height:height*0.22,marginBottom:10}}
                  />
                  <Text style={[styles.text,{color:'white'}]}>
                  {/* {item.title.length>20? item.title.slice(0,14)+'...':item.title} */}
                  {/* {item.title} */}
                </Text>
                </View>

                
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({
  titleText:{
    color:"white",
    fontSize:20
  },
  text:{
    color:"#FFD700",
    fontSize:15
  },
  container:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:16,
    marginVertical:16
  }
})