import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function QRScanScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>QRScan Screen</Text>
        <Button
          title="new recipient"
          onPress={() => navigation.navigate('NewRecipientScreen')}
        />

      </View>
    );
  }

export default QRScanScreen;