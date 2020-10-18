import React from 'react';
import { 
    View, 
    Text, 
    Button
} from 'react-native';

function EarnScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Earn passive income by invest in DeFi yield farming pools</Text>
        <Text>Curve.finance APY 34.56%</Text>
        <Text>yearn.finance APY 28.82%</Text>
        <Text>Taidl charges 5% of your earned interest as service fee</Text>
        <Button
          title="OK"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

export default EarnScreen;