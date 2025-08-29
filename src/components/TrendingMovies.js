import React, { useRef, useState } from 'react';
import { View, Text, FlatList,TouchableWithoutFeedback, Dimensions, Image, StyleSheet } from 'react-native';
//  import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const TrendingMovies = ({data}) => {
  const navigation = useNavigation();
  const ref=useRef()
  const [isActive,setIsActive]=useState(0)
 

  const handleClick = (item) => {
    console.log('Trending',item)
    navigation.navigate('Movie',  item); // Navigate to the 'Movie' screen with item data
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} isActive={isActive}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center" // Align to center on swipe
        decelerationRate="fast" // Faster swipe motion
        snapToInterval={width * 0.62} // Make sure items snap into place
        contentContainerStyle={styles.flatListContainer}
        pagingEnabled // Ensure paging-style snapping
        // onScroll={}
      />
     
      {/* <Carousel
        data={data}
        renderItem={({ item }) => (
        <MovieCard item={item} handleClick={handleClick} />
         )}
        firstItem={0}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        layout={"default"}
        onSnapToItem={(index) => console.log('Current index:', index)}
        containerCustomStyle={styles.carouselContainer}
      /> */}
    </View>
  )
}



const MovieCard = ({ item, handleClick, isActive}) => {
 
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{uri:image500(item.poster_path)}} // Update with your image path
        style={[styles.movieImage,{ width: isActive ? width * 0.6 : width * 0.6,
                                    height: isActive ? height * 0.4 : height * 0.4}]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  trendingText:{
    color:'#FFF'
  },
  container: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  movieImage: {
    borderRadius: 25, // Change this value to adjust the corner radius
    marginHorizontal:10
  },
  carouselContainer: {
    alignItems: 'center',
  },
 
});
export default TrendingMovies;