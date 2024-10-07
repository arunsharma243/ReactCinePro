import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Dimensions,Image, Alert,Linking} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import { fetchMovieDetails,fetchSimilarMovies,fetchMovieCredits } from '../api/moviedb';
import { image500 } from '../api/moviedb';
import {BookmarkContext} from '../contexts/BookmarkContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';


const { width, height } = Dimensions.get('window');
const MovieScreen = () => {
  const {params:item}=useRoute();
  const [loading,setLoading]=useState(false)
  // const [mediaType,setMediaType]=useState('')
  let mediaType=''
  if(!item.seasons||item.media_type==='movie')
    {
       mediaType='movie'
    }
     else 
    {
      mediaType='tv'
    }
  


   const[bookmark,setBookmark]=useState(false)

  const saveBookmark= async(itemId) => {
    setBookmark(true);
    await AsyncStorage.getItem('bookmark').then((token)=>{
      const res=JSON.parse(token);
      if(res!==null){
        let data=res.find((val)=>val===itemId);
        if(data==null){
          res.push(itemId);
          AsyncStorage.setItem('bookmark',JSON.stringify(res));
          Toast.show('Added to Bookmarks');
        }
      }
      else{
        let bookmark=[];
        bookmark.push(itemId);
        AsyncStorage.setItem('bookmark',JSON.stringify(bookmark));
        Toast.show('Added to Bookmarks');
      }
    });
  }

  const removeBookmark= async(itemId) => {
    setBookmark(false)
    const bookmark=await AsyncStorage.getItem('bookmark').then((token)=>{
      const res=JSON.parse(token);
      return res.filter((id)=>(id!==itemId));
    });
    await AsyncStorage.setItem('bookmark',JSON.stringify(bookmark));
    Toast.show('Removed from Bookmarks');
  }

  const renderBookmark=async(itemId)=>{
    await AsyncStorage.getItem('bookmark').then((token)=>{
      const res=JSON.parse(token);
      if(res!=null){
        let data=res.find((val)=>val===itemId);
        return data==null?setBookmark(false):setBookmark(true)
      }
  });
}
 

  const navigation=useNavigation();
  const[cast,setCast]=useState([])
 
  const [movie,setMovie]=useState({});
  const [similarMovies,setSimilarMovies]=useState([]);

  // console.log('itemids',item.id)
  useEffect(()=>{
    console.log('itemid',item.id)
    console.log('mediatype',item.media_type)
    
    
    console.log(mediaType)
    setLoading(true);
    getMoviesDetails(item.id,mediaType);
    getMovieCredits(item.id,mediaType);
    getSimilarMovies(item.id,mediaType);
       },[item])

       useEffect(()=>{
        if(!loading){
        renderBookmark(item?.id);
        }
      },[loading]);

       const getMoviesDetails=async (id,type)=>{
        setLoading(true)
        const data=await fetchMovieDetails(id,type);
        if(data) setMovie(data);
        setLoading(false);
       }
       const getMovieCredits=async (id,type)=>{
        setLoading(true)
        const data=await fetchMovieCredits(id,type);
        //console.log('snxjks','skqwmk');
        // console.log(data)
        if(data && data.cast) setCast(data.cast);
        setLoading(false)
       }
       const getSimilarMovies=async (id,type)=>{
        setLoading(true)
        const data=await fetchSimilarMovies(id,type);
        //console.log('id',id);
        //console.log('data',data);
         if(data && data.results) setSimilarMovies(data.results);
         setLoading(false)
       }

       const handleDownload=()=>{
        // console.log(item.title)
       let url=""
       if(item.original_language=="hi" || item.original_language=="ta" || item.original_language=="te" || item.original_language=="kn" || item.original_language=="pa" || item.original_language=="mr" || item.original_language=="ml") {
         url = `https://topmovies.tel/download-${mediaType === 'movie' ? downloadTitle(item.title) : downloadTitle(item.name)}`;

    }
    else if(item.original_language=="ja")
    {
       url = `https://animeflix.pm/download-${mediaType === 'movie' ? downloadTitle(item.title) : downloadTitle(item.name)}`;

    }
    else{
      url = `https://moviesmod.day/download-${mediaType === 'movie' ? downloadTitle(item.title) : downloadTitle(item.name)}}`;
     
    }
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL:', err);
    });
       }

       function downloadTitle(title) {
        // Split the title into an array of words by spaces
        const arr = title.split(/\s+/);
      
        // Join the array back into a string with '-' as a separator
        const ans = arr.join('-');
      
        return ans;
      }

      if (loading) {
        return (
          <SafeAreaView >
            <Loading/>
          </SafeAreaView>
        );
      }
  return (
   
   <ScrollView
   contentContainerStyle={styles.container}
 //  className="flex-1 bg-neutral-900 mx-9"
   >
    
    <View >
      <SafeAreaView style={styles.topContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.background,{borderRadius:10}]}>
        <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>handleDownload()} style={{marginRight:25}} >
        <FontAwesome name="download" size={30} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>bookmark?removeBookmark(item.id):saveBookmark(item.id)}>
      < FontAwesome name={bookmark? "bookmark":"bookmark-o"} size={30} color="#FFD700" /> 
        </TouchableOpacity>
        </View>
       
      </SafeAreaView>
      
      <View style={[ { marginTop: -(height * 0.11) ,zIndex:-1}]}>
      <Image
       source={{uri:image500('/'+item.poster_path)}} // Update with your image path
       style={styles.movieImage}
     />

        {/* <LinearGradient
         colors={['transparent', 'rgba(1,1,1,1)', 'rgba(23,23,23,)']} 
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      /> */}
      <View style={[ { marginTop: -(height * 0.09) }]}>
      {/* Movie Title */}
      <Text style={styles.title}>
        {movie.title} 
      </Text>

      {/* Status, Release, Runtime */}
      <Text style={styles.subtitle}>
        {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
      </Text>

      {/* Genres */}
      <View style={styles.genresContainer}>
       {
        movie?.genres?.map((genre,index)=>{
          let showDot=index+1 != movie.genres.length;
          return(
            <Text key={index} style={styles.genre}>
              {genre?.name} {showDot?"  •":null}
            </Text>
          )
        })
       }
      </View>
      <Text style={styles.synopisText}>
      {movie?.overview}
      </Text>
    </View>
      </View>
      
    </View>
  
   {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}

  {similarMovies.length>0 && 
  <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>
  }
      
    

   </ScrollView>
  )
}

export default MovieScreen

const styles = StyleSheet.create({
  container:{
    paddingBottom:20,
    backgroundColor:'black',
    flexGrow:1
  },
  topContainer:{
    flexDirection:'row',
  justifyContent:'space-between',
    alignItems:'center',
     marginVertical:31,
     width:'90%',
      marginHorizontal:18,
 // marginEnd:50
  },
  background:{
    backgroundColor:'#FFD700',
  
  },
  synopisText:{
    color:'white',
    textAlign:'center'
  },
  movieImage:{
    width:'100%',
    height:height*0.5
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.4, // 40% of the screen height
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24, // Equivalent to text-3xl
    fontWeight: 'bold',
    letterSpacing: 2, // Equivalent to tracking-wider
  },
  subtitle: {
    color: 'rgba(156, 163, 175, 1)', // Equivalent to text-neutral-400
    textAlign: 'center',
    fontSize: 16, // Equivalent to text-base
    fontWeight: '600', // Equivalent to font-semibold
    marginVertical: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16, // Equivalent to mx-4
    marginVertical: 8,
  },
  genre: {
    color: 'rgba(156, 163, 175, 1)', // Equivalent to text-neutral-400
    fontSize: 16,
    fontWeight: '600', // Equivalent to font-semibold
    marginHorizontal: 8, // Equivalent to space-x-2
    textAlign: 'center',
  },
})