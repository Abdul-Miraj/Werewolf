import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Background from './src/components/Background';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Background />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
