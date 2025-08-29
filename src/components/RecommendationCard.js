import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../api/moviedb'
import { useNavigation } from '@react-navigation/native';

const RecommendationCard = ({movie,poster,id}) => {
    const [movieDetails,setMovieDetails]=useState({});
    const navigation=useNavigation()
    // console.log(id)
    useEffect(()=>{
          getMoviesDetails(id,"movie");
           },[])

           const getMoviesDetails=async (id,type)=>{
            // setLoading(true)
            const data=await fetchMovieDetails(id,type);
            // console.log(data)
            if(data) setMovieDetails(data);
            // setLoading(false);
           }
    const handleClick=()=>{
        console.log("inside",movieDetails.original_title)
        navigation.navigate('Movie',movieDetails)

    }

           

  return (
    <TouchableOpacity onPress={()=>{handleClick()}}>
      <View style={styles.card}>
    <Image source={{ uri: poster }} style={styles.poster} />
    {/* <Text style={styles.title}>{id}</Text> */}
     </View>
    </TouchableOpacity>
   
  )
}

export default RecommendationCard

const styles = StyleSheet.create({
    card: {
        //marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
      },
      poster: {
        width: 120,
        height: 180,
        borderRadius: 10,
      },
      title: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
      },
})