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

    // render component when you join game
    joinRoom = () => {
        return (
            <View style={styles.btnContainer}>
                <Btn text="Join" onPress={() => this.props.navigation.navigate('Night')} />
                <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
            </View>
        );
    };

    // render component when you create game
    createRoom = () => {
        return (
            <View style={styles.btnContainer}>
                <Btn text="Create" onPress={() => this.props.navigation.navigate('Roles')} />
                <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
            </View>
        );
    };

    // default buttons to render
    renderDefault = () => {
        return (
            <View style={styles.btnContainer}>
                <Btn text="New Game" onPress={() => this.setState({ render: 1 })} />
                <Btn text="Join Game" onPress={() => this.setState({ render: 2 })} />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>
                    <Text style={styles.Title}>Werewolf</Text>
                    {this.state.render == '0' ? this.renderDefault() : null}
                    {this.state.render == '1' ? this.createRoom() : null}
                    {this.state.render == '2' ? this.joinRoom() : null}
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
        margin: 50,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    btnContainer: {
        flexDirection: 'row',
    },
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};
