import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Background from './common/Background';
import Btn from './common/Button';

// Home screen that imports all components
export default class Home extends Component {
  constructor(props) {
          super(props);
          this.state = {
              render: 0,
          };
      }

      createRoom = () => {
          return (
              <View style={styles.btnContainer}>
                  <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
                  <Btn text="Create Room"  onPress={() => this.props.navigation.navigate('Night')}  />
              </View>
          );
      };

      joinRoom = () => {
          return (
              <View style={styles.btnContainer}>
                  <Btn text="Join Room" onPress={() => this.props.navigation.navigate('Roles')} />
                  <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
              </View>
          );
      };

      renderDefault = () => {
          return (
              <View style={styles.btnContainer}>
                  <Btn text="Join Room" onPress={() => this.setState({ render: 1 })} />
                  <Btn text="Create Room" onPress={() => this.setState({ render: 2 })} />
              </View>
          );
      };

      render() {
          return (
              <View style={styles.container}>
                  <Background uri={require('../img/Bg.jpg')}>
                      <Text style={styles.Title}>Werewolf</Text>
                      {this.state.render == '0' ? this.renderDefault() : null }
                      {this.state.render == '1' ? this.joinRoom() : null }
                      {this.state.render == '2' ? this.createRoom() : null }
                  </Background>
              </View>
          );
      }
  }

const styles = {
    container: {
        flex: 1,
    },
    Title: {
        alignSelf: 'center',
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};
