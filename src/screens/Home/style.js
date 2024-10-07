import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      height:'100%',
        backgroundColor: '#000', // Neutral dark background
      },
      safeAreaIOS: {
        marginBottom: -2,
      },
      safeAreaAndroid: {
        marginBottom: 3,
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
      scrollContent: {
        paddingBottom: 10,
      },
})

export default styles;