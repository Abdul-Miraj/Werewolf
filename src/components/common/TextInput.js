import React, { Component } from 'react';
import { TextInput } from 'react-native';

// Home screen that imports all components
export default class TxtInput extends Component {
  constructor(props) {
          super(props);
          this.state = {
              name: '',
          };
      }

      render() {
          return (
            <TextInput style={styles.TextBox} onChangeText={(text) => this.setState({ name: text})} value={this.state.name} />
          );
      }
  }

const styles = {
    TextBox: {
        height: 40,
        borderWidth: 2,
    },
};