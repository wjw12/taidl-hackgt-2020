import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
//import QR from 'qrcode.react';

function RequestScreen({ navigation }) {
    return (
    <View style={styles.container}>
        <View style={styles.top}>
            
        </View>

    </View>
    );
  }

export default RequestScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#fff",
    },
    top: {
      flex: 0.5,
      backgroundColor: "grey",
      borderWidth: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      //padding: 10,
      margin: 20,
      paddingBottom: 0
    },

  });