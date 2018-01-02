import React from 'react';
import { Button, View } from 'react-native';


const Btn = (props) => {
  return (
    <View style={styles.button} >
      <Button title={props.text} onPress={props.onPress} />
    </View>
  );
};

styles = {
  button: {
    width: '40%',
    height: 40,
    margin: 10
  },
};

export default Btn;
