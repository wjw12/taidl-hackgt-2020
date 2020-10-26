import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function PrivateKeyScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Export private key. Use it at your own risk.</Text>
        <Text>Warning: you will lose your xDai if you lose the key</Text>
        <Button
          title="OK"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default PrivateKeyScreen;