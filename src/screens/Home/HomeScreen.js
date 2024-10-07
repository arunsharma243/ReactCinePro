import React, { useEffect } from 'react'
import styles from './style'
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView,StatusBar } from 'react-native';
// import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrendingMovies from '../../components/TrendingMovies';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import MovieList from '../../components/MovieList';
import { useNavigation } from '@react-navigation/native';
// import Loading from '../../components/loading';
import { fetchTrendingMovies,fetchUpcomingMovies,fetchTopRatedMovies } from '../../api/moviedb';
import Loading from '../../components/Loading';




const HomeScreen = () => {
  const [trending,setTrending]=useState([]);
  const [upcoming,setUpcoming]=useState([]);
  const [topRated,setTopRated]=useState([]);
  const [loading,setLoading]=useState(false)
  const navigation=useNavigation();
  const ios = Platform.OS === 'ios';


  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies(1);
    getTopRatedMovies(1);
  },[])

  const getTrendingMovies=async()=>{
    const data=await fetchTrendingMovies();
    // console.log('trending movies:',data);
    if(data && data.results) setTrending(data.results);
      setLoading(false)
  }
  const getUpcomingMovies=async(page)=>{
    const data=await fetchUpcomingMovies(page);
    // console.log('trending movies:',data);
    if(data && data.results) setUpcoming(data.results);
      setLoading(false)
  }
  const getTopRatedMovies=async(page)=>{
    const data=await fetchTopRatedMovies(page);
    // console.log('trending movies:',data);
    if(data && data.results) setTopRated(data.results);
      setLoading(false)
  }



  return (
    <View style={styles.container}>
    {/* Search bar and logo */}

    <SafeAreaView style={ios ? styles.safeAreaIOS : styles.safeAreaAndroid}>

      <StatusBar style="light" />
      <View style={styles.header}>
      <AntDesign name="menu-fold" size={24} color="white" />
        <Text style={styles.headerText}>
          <Text style={styles.logoText}>M</Text>ovies
        </Text>
        <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
    
         <MaterialIcons name="search" size={30} color="white" />
        
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
    
    {
      loading?(
        <Loading/>
        
      ):
      (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* TrendingMovies component */}
       {trending.length>0 && <TrendingMovies data={trending}/> } 
  
        {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming}/>}
  
        {topRated.length>0 && <MovieList title="Top Rated" data={topRated}/>}
      </ScrollView>
      )
    }

   
  </View>
  )
}

export default HomeScreen;

