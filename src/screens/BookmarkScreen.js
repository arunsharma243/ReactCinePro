import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Image, Dimensions, SafeAreaView, Platform, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMovieDetails, image185 } from '../api/moviedb';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const BookmarkScreen = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTV, setBookmarkedTV] = useState([]);  // State for TV series
  const [refreshing, setRefreshing] = useState(false);
  const [mediaType, setMediaType] = useState('movies');  // Toggle between movies and TV
  const navigation = useNavigation();
  const ios = Platform.OS === 'ios';
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchBookmark();
    }
  }, [isFocused, mediaType]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookmark().then(() => {
      setRefreshing(false);
    });
  }, [mediaType]);

  const getMediaDetails = async (id, type) => {
    try {
      const data = await fetchMovieDetails(id, type);
      if (data) {
        if (type === 'movie') {
          setBookmarkedMovies(prevMovies => {
            const isAlreadyBookmarked = prevMovies.some(movie => movie.id === data.id);
            if (!isAlreadyBookmarked) {
              return [...prevMovies, data];
            }
            return prevMovies;
          });
        } else {
          setBookmarkedTV(prevTV => {
            const isAlreadyBookmarked = prevTV.some(tv => tv.id === data.id);
            if (!isAlreadyBookmarked) {
              return [...prevTV, data];
            }
            return prevTV;
          });
        }
      }
    } catch (error) {
      console.error('Error fetching media details:', error);
    }
  };

  const fetchBookmark = async () => {
    try {
      const token = await AsyncStorage.getItem('bookmark');
      const res = JSON.parse(token) || [];
      setBookmarkedMovies([]);
      setBookmarkedTV([]);

      res.forEach((element) => {
        getMediaDetails(element, mediaType === 'movies' ? 'movie' : 'tv');
      });
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleButton = (item) => {
    navigation.push('Movie', item);
  };

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
      <SafeAreaView style={ios ? styles.safeAreaIOS : styles.safeAreaAndroid}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background, { borderRadius: 10 }]}>
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            <Text style={styles.logoText}>B</Text>ookmarks
          </Text>
          <TouchableOpacity style={[styles.background, { borderRadius: 10 }]}>
            
          </TouchableOpacity>
        </View>

        <View style={styles.toggleButtons}>
          <TouchableOpacity onPress={() => setMediaType('movies')} style={[styles.toggleButton, mediaType === 'movies' && styles.activeButton]}>
            <Text style={styles.toggleText}>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMediaType('tv')} style={[styles.toggleButton, mediaType === 'tv' && styles.activeButton]}>
            <Text style={styles.toggleText}>TV Series</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        (mediaType === 'movies' && bookmarkedMovies.length > 0) || (mediaType === 'tv' && bookmarkedTV.length > 0) ? (
          <FlatList
            data={mediaType === 'movies' ? bookmarkedMovies : bookmarkedTV}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleButton(item)}>
                <View style={styles.itemContainer}>
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.image}
                  />
                  <Text style={styles.text}>
                    {item.title || item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ color: 'white' }}>No bookmarks</Text>
          </View>
        )
      }
    </View>
  );
}

export default BookmarkScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    margin: 10,
  },
  image: {
    borderRadius: 20,
    width: (width / 2) - 30,
    height: height * 0.32,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    marginLeft: 20,
  },
  background: {
    backgroundColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoText: {
    color: '#FFD700',
    fontSize: 24,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#FFD700',
  },
  toggleText: {
    color: 'white',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
