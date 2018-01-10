import React from 'react';
import { View } from 'react-native';
import Button from 'apsl-react-native-button';

// custom button component
const Btn = (props) => {
  return (
    <View style={styles.container} >
      <Button isDisabled={props.isDisabled ? true : false} style={styles.button} textStyle={styles.text} onPress={props.onPress}>
        {props.text}
      </Button>
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
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    color: 'white',
    fontSize: 14
  }
};

export default Btn;
