import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isReachable } from './ReachabilityTester';

export default class App extends React.Component {

  render() {
    isReachable().then(result => {
      console.log(result);
    });
    
    return (
      <View style={styles.container}>
        <Text>{"Test"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
