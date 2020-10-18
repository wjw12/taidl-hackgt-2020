import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function NewRecipientScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>New Recipient Screen</Text>
        <Button
          title="sent confirm screen"
          onPress={() => navigation.navigate('SentConfirmScreen')}
        />

      </View>
    );
  }

export default NewRecipientScreen;