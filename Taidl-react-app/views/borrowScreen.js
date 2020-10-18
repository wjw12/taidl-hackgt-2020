import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function BorrowScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Use xDai as collateral to borrow Ethereum on mainnet</Text>
        <Text>Max collateralization ratio: 150%</Text>
        <Button
          title="OK"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default BorrowScreen;