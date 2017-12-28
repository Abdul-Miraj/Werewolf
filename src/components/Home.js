import React from 'react';
import { View, Text } from 'react-native';
import Background from './common/Background';

// Home screen that imports all components
export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>
                    <Text style={styles.Title}>Werewolf</Text>
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
        color: 'white'
    },
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};

