import React from 'react';
import { Button } from 'react-native';


const Btn = (props) => {
  return (
      <Button  title={props.text} onPress={props.onPress} />
  );
};

export default Btn;
