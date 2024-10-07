import { Platform, StyleSheet, Text, View,Dimensions,SafeAreaView,TouchableOpacity,Image,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import { fetchPersonDetails,fetchPersonMovies, image342 } from '../api/moviedb';
import AntDesign from 'react-native-vector-icons/AntDesign';


const { width, height } = Dimensions.get('window');
const ios=Platform.OS=='ios';
const PersonScreen = () => {
    const {params:item}=useRoute();
    const navigation=useNavigation();
    const [isFavourite,toggleFavourite]=useState(false)
    const [personMovies,setPersonMovies]=useState([]);
    const [person,setPerson]=useState([]);
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
   //console.log('person',item)
   getPersonDetails(item.id);
   getPersonMovies(item.id);
    },[item]);

    const getPersonDetails=async id=>{
        const data=await fetchPersonDetails(id);
        // console.log(data)
        if(data) setPerson(data);
    }

    const getPersonMovies= async id=>{
        const data=await fetchPersonMovies(id);
       // console.log(data)
       if(data && data.cast) setPersonMovies(data.cast)
    }

  return (
    <SafeAreaView style={styles.container}>
    {/* Back Button and Favorites Button */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <AntDesign name="left" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleFavourite(isFavourite)}>
        {/* <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} /> */}
      </TouchableOpacity>
    </View>

    {/* Person Details Section */}
    <ScrollView contentContainerStyle={styles.contentContainer}>

      <View style={{
        shadowColor:'gray',
        shadowRadius:40,
        shadowOffset:{width:0,height:5},
        shadowOpacity:1,
        flexDirection:'row',
        justifyContent:'center',
        
        }}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri:image342(person?.profile_path)}}
          style={styles.image}
        />
      </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{person?.name}</Text>
        <Text style={styles.location}>{person?.place_of_birth}</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Gender</Text>
          <Text style={styles.detailValue}>{person?.gender==1?"Female":"Male"}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Birthday</Text>
          <Text style={styles.detailValue}>{person?.birthday}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Known for</Text>
          <Text style={styles.detailValue}>{person?.known_for_department}</Text>
        </View>

        <View style={[styles.detailItem,{borderRightWidth: 0}]}>
          <Text style={styles.detailTitle}>Popularity</Text>
          <Text style={styles.detailValue}>{person?.popularity?.toFixed(2)}</Text>
        </View>
      </View>

      {/* Biography Section */}
      <View style={styles.biographyContainer}>
        <Text style={styles.biographyTitle}>Biography</Text>
        <Text style={styles.biographyText}>
       {person?.biography || 'N/A'}
        </Text>
      </View>

      {/* Movies Section */}
      {/* Assuming MovieList is another component */}
      <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
    </ScrollView>
  </SafeAreaView>
  )
}

export default PersonScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Equivalent to bg-neutral-900
        paddingBottom: 20,
      },
      header: {
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 20, // Equivalent to vertical margin
      },
      button: {
        backgroundColor: '#FFD700', // Adjust according to your design
        borderRadius:10
      },
      contentContainer: {
        paddingBottom: 20,
      },
      imageContainer: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4B5563', // Equivalent to border-neutral-400
        borderRadius: 2000,
        overflow: 'hidden',
        height: 320,
        width: 320
      },
      image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        alignContent:'center',
        justifyContent:'center'
      },
      nameContainer: {
        marginTop: 24,
        alignItems: 'center',
      },
      name: {
        fontSize: 24, // Equivalent to text-3xl
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      location: {
        fontSize: 16, // Equivalent to text-base
        color: '#9CA3AF', // Equivalent to text-neutral-500
        textAlign: 'center',
      },
      detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#374151', // Equivalent to bg-neutral-700
        borderRadius:40,
        marginHorizontal:10
      },
      detailItem: {
        borderRightWidth: 2,
        borderColor: '#9CA3AF', // Equivalent to border-r-neutral-400
        paddingHorizontal: 8,
        alignItems: 'center',
      },
      detailTitle: {
        color: 'white',
        fontWeight: 'bold',
      },
      detailValue: {
        color: '#D1D5DB', // Equivalent to text-neutral-300
        fontSize: 12,
      },
      biographyContainer: {
        padding: 16,
        marginTop: 24,
      },
      biographyTitle: {
        color: 'white',
        fontSize: 20, // Adjust as needed
      },
      biographyText: {
        color: '#9CA3AF', // Equivalent to text-neutral-400
        tracking: 'wide',
      },
}) 