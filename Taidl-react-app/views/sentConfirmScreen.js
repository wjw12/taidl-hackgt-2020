import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function SentConfirmScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Transaction Confirmed</Text>

      </View>
    );
  }

export default SentConfirmScreen;