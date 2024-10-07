import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { image185 } from '../api/moviedb';

const Cast = ({cast,navigation}) => {
    let personName= "Robert Downey Jr.";
    let characterName="Iron Name";
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Top Cast</Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {cast.map((person, index) => (
        <TouchableOpacity 
        key={index} 
        style={styles.castMember}
        onPress={()=>navigation.navigate('Person',person)}
        >
          <View style={styles.castImage}>
          <Image
       source={{uri:image185(person.profile_path)}} // Update with your image path
       //style={styles.movieImage}
       style={styles.castImage}
     />
          </View>
          <Text style={styles.characterName}>
            {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
          </Text>
          <Text style={styles.personName}>
            {person?.name.length > 10 ? person?.name.slice(0, 10) + '...' : person?.original_name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
  )
}

export default Cast

const styles = StyleSheet.create({
    container: {
        marginVertical: 24, // Equivalent to my-6
      },
      title: {
        color: 'white',
        fontSize: 16, // Adjust size as needed, equivalent to text-1g
        marginHorizontal: 16, // Equivalent to mx-4
        marginBottom: 20, // Equivalent to mb-5
      },
      scrollViewContent: {
        paddingHorizontal: 15,
      },
      castMember: {
        marginRight: 16, // Equivalent to ar-4
        alignItems: 'center',
      },
      castImage: {
        width: 50, // Adjust the width and height as needed
        height: 50,
        //backgroundColor: '#ccc', // Placeholder for an image
        borderRadius: 35, // Make it circular
        //resizeMode:'contain'
      },
      characterName: {
        color: 'white',
        fontSize: 12, // Equivalent to text-xs
        marginTop: 8, // Equivalent to mt-1
      },
      personName: {
        // color: 'rgba(156, 163, 175, 1)', // Equivalent to text-neutral-400
        color:'white',
        fontSize: 12, // Equivalent to text-xs
        marginTop: 4, // Equivalent to mt-1
      },
})