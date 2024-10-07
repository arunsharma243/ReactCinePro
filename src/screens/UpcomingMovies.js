import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchUpcomingMovies, image342 } from '../api/moviedb';
import Loading from '../components/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const renderItem = ({ item, index, navigation }) => (
  <TouchableWithoutFeedback
    key={index}
    onPress={() => navigation.push('Movie', item)}
  >
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: image342(item.poster_path) }}
        style={styles.image}
      />
      <Text style={[styles.text, { color: 'white' }]}>
        {item.title.length > 20 ? item.title.slice(0, 14) + '...' : item.title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const UpcomingMovies = () => {
  const { params } = useRoute();
  const { title } = params;
  
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1); // Start with page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if more pages are available
  
  const navigation = useNavigation();

  useEffect(() => {
    getUpcomingMovies(page);
  }, [page]);

  const getUpcomingMovies = async (page) => {
    if (!hasMore || loading) return; // Prevent further loading if no more pages or already loading
    setLoading(true);

    const data = await fetchUpcomingMovies(page);
    if (data && data.results) {
      setUpcoming(prev => [...prev, ...data.results]); // Append new data
      setHasMore(data.results.length > 0); // If there are no more results, stop loading more
    }
    setLoading(false);
  };

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1); // Increase the page number
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
<TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.background,{borderRadius:10}]}>
        <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
  <Text style={styles.headerText}>
    <Text style={styles.logoText}>U</Text>pcoming
  </Text>
  <TouchableOpacity onPress={()=> navigation.navigate('Search')}>

   {/* <MaterialIcons name="search" size={30} color="white" /> */}
  
  </TouchableOpacity>
  
</View>
      <FlatList
        data={upcoming}
        renderItem={(itemData) => renderItem({ ...itemData, navigation })}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        onEndReached={loadMoreMovies} // Trigger more loading when reaching the end
        onEndReachedThreshold={0.5} // Adjust the threshold as needed
        ListFooterComponent={loading && <Loading/>} // Show loading at the bottom
      />
    </View>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    //paddingBottom: 50,

  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  image: {
    borderRadius: 20,
    width: '100%',
    height: height * 0.30,
  },
  itemContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    width: width * 0.45,
    marginHorizontal: 5,
  },
  titleText: {
    color: 'yellow',
    fontSize: 25,
    fontWeight: '600',
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingTop:10,
    paddingBottom:40
   // height:'10%'
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoText: {
    color: '#FFD700', // Custom color for 'M'
    fontSize: 24,
  },
  background:{
    backgroundColor:'#FFD700',
  },
});
