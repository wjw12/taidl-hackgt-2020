import {
    StyleSheet,
} from 'react-native';


const SectionListStyle = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 10
    },
    icon: {
      flex: 1, 
      flexDirection: 'row', 
      margin: 'auto', 
      maxWidth: 80,
      height: 80,
      paddingLeft: 5
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(217,217,217,1.0)',
    },
    row: {
      flex: 1,
      flexDirection: "row", // main axis
      justifyContent: "flex-start", // main axis
      alignItems: "center", // cross axis
      height: 80
    },
    userName: {
      flex: 1,
      padding: 10,
      fontSize: 14
    },
    amount: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(117,117,117,1.0)',
    },
    boldUserName: {
        flex: 1,
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold'
    }
  })

export default SectionListStyle