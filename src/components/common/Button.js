import React from 'react';
import { Button, View } from 'react-native';


const Btn = (props) => {
  return (
    <View style={styles.container} >
      <Button style={styles.button} title={props.text} onPress={props.onPress} />
    </View>
  );
};

styles = {
  container: {
    width: '40%',
    height: 40,
    margin: 10
  },
  button: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
  }
};

export default Btn;
