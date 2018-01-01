import React from 'react';
import { View, Text } from 'react-native';

// Home screen that imports all components
export default class Night extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            night: 1
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#222c31',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Title: {
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
};

// Hide the navigation
Night.navigationOptions = {
    header: null,
};
