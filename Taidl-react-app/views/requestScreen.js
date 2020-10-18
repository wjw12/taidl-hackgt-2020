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
    Image
} from 'react-native';
//import QR from 'qrcode.react';

function RequestScreen({ navigation }) {
    return (
    <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.titleText}>Scan to pay me</Text>
          <Text style={styles.bodyText}>
            Share your address by forwarding your QR code or copying and pasting in a message
          </Text>
          <View style={styles.qrView}>
            <Image
              style={styles.qr}
              source={require('../img/myQR.jpg')}
            />
          </View>
          <Text style={styles.bodyText}>
            0xd7b723a390723905af6731b76dd436913bc60aa9
          </Text>
          <View style={styles.buttonView}>
            <Button 
            titleStyle={{ color: "#00BFA4", fontSize: 15 }}
            title="Set Amount"
            color= "#00BFA4"
            onPress={() => {}}
            />
            <Button 
            titleStyle={{ color: "#00BFA4", fontSize: 15 }}
            title="Copy Address"
            color= "#00BFA4"
            onPress={() => {}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.touchable, {
              backgroundColor: '#00BFA4',
              borderColor: '#00BFA4',
              borderWidth: 1,
          }]}
          onPress={() => {}}
        >
        <Text style={[styles.text, {
            color:'white'
        }]}>Share</Text>
        </TouchableOpacity>
        <View style={styles.bottomholder}>
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
      flex: 0.7,
      backgroundColor: "#F0F0F0",
      borderWidth: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      margin: 20,
      paddingBottom: 0,
    },
    titleText: {
      fontSize: 20,
      textAlign: "center",
      color: 'black',
      padding: 5,
      marginTop: 10,
    },
    bodyText: {
      fontSize: 10,
      textAlign: "center",
      color: '#949494',
      padding: 5,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20
    },
    qrView: {
      width: '60%',
      height: '60%',
      alignSelf: 'center',
      alignItems: 'center'
    },
    qr: {
      flex: 1,
      aspectRatio: 1, 
      resizeMode: 'contain',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    touchable:{
      flex: 0.08,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 20,
      marginBottom: 5,
      marginTop: 5
    },
    text: {
      fontSize: 20,
      textAlign: "center",
      color: 'white'
    },
    bottomholder:{
      flex: 0.2,
      backgroundColor: 'white',
    }
  });