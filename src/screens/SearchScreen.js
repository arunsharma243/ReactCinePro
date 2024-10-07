import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet,Platform,Dimensions,FlatList,TouchableWithoutFeedback } from 'react-native'
import React,{useCallback, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { image185, searchMovies } from '../api/moviedb';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//import { debounce } from 'lodash';


const { width, height } = Dimensions.get('window');
const ios=Platform.OS=='ios';
const SearchScreen = () => {
    const navigation=useNavigation();
    const [results,setResults]=useState([]);
    const[loading,setLoading]=useState(false)
    const handleSearch=value=>{
        setLoading(true);
       // console.log('value',value);
        if(value && value.length>2){
           searchMovies ({
            query:value,
            include_adult:'false',
            language:'en=US',
            page:'1'
           }).then(data=>{
            setLoading(false);
           // console.log('got movies:',data);
            if(data && data.results) setResults(data.results);
           })
        }else{
            setLoading(false)
            setResults([])
        }
    }

    //const handleTextDebounce=useCallback(debounce(handleSearch,400),[]);
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
      onChangeText={handleSearch}
        placeholder="Search Movie"
        placeholderTextColor="lightgray"
        style={styles.searchInput}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.searchButton}
      >
        <MaterialIcons name="cancel" size={20} color="black" />
      </TouchableOpacity>
    </View>

    {/* Results Section */}
    {
    results.length>0?(
      <View style={{height:'100%',width:'100%',backgroundColor:'black'}}>
 <Text style={styles.resultsText}>Results ({results.length})</Text>
      <FlatList
      data={results}
      numColumns={2} // Set number of columns to 2 for the grid
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => {item.media_type==='person'?navigation.push("Person",item):navigation.push("Movie",item)}}>
          <View style={styles.itemContainer}>
            <Image
             source={item.media_type === "person" ? { uri: image185(item.profile_path) } : { uri: image185(item.poster_path) }}

              style={styles.image}
            />
            <Text style={styles.text}>
              {item.media_type==='movie'?(
              item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title
              ):
              (
                item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name
              )
              }
            {/* {item.title} */}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
    </View>
   
    ):(
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image
              source={require('../assets/images/nodata.png')} // Ensure the image path is correct
              style={{width:'60%',height:'80%',resizeMode:'contain'}}
              />
        </View>
    )
}
  </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#2d2d2d', // Equivalent to bg-neutral-800
       backgroundColor:'black'
      },
      searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4B5563', // Equivalent to border-neutral-500
        borderRadius: 9999, // To make it rounded
        margin: 12,
        paddingHorizontal: 4,
        // marginTop:10
      },
      searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingLeft: 16,
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
      },
      searchButton: {
        borderRadius: 9999,
        padding: 8,
        backgroundColor: '#6B7280', // Equivalent to bg-neutral-500
      },
   
      resultsText: {
        color: 'white',
        fontWeight: '600',
        marginBottom: 8,
      },
      
    
      itemContainer: {
        flex: 1,
        marginBottom: 15,
        marginRight: 10, // Adds spacing between items in a row
      },
      image: {
        borderRadius: 20,
        width: (width / 2) - 30, // Half of the screen width minus padding
        height: height * 0.32,
        marginBottom: 10,
      },
      text: {
        color: 'white',
       // textAlign: 'center',
      },
      titleText:{
        color:'yellow',
        fontSize:25,
        fontWeight:'600',
        margin:20
      }
})