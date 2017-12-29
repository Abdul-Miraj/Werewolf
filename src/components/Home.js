import React from 'react';
import { View, Text } from 'react-native';
import Background from './common/Background';
import Btn from './common/Button';

// Home screen that imports all components
export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>

                    <Text style={styles.Title}>Werewolf</Text>
                    <View style={styles.btnContainer}>
                      <View style={styles.button}>
                        <Btn text="Join Room" onPress= { () => {}} />
                      </View>
                      <View style={styles.button}>
                        <Btn text="Create Room" onPress= { () => {}} />
                      </View>
                    </View>

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
        justifyContent: 'center',
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

    button: {
      width: '40%',
      height: 40,

    },
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};
