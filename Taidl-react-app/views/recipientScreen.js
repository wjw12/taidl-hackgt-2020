import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button
} from 'react-native';
//import QR from 'qrcode.react';

function RecipientScreen({ navigation }) {
    return (
    <View style={styles.container}>
        <Text>Receive Screen</Text>
        <Button
          title="new recipient"
          onPress={() => navigation.navigate('NewRecipientScreen')}
        />
        <Button
          title="qr scan"
          onPress={() => navigation.navigate('QRScanScreen')}
        />

    </View>
    );
  }

export default RecipientScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: "#fff",
    }
});