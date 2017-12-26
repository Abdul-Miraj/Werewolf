import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class background extends Component {
    render() {
        return (
            <ImageBackground source={require('../img/Bg.jpg')} style={styles.background} >
                <Text style={styles.Title}>Werewolf</Text>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    },
    Title: {
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white'
    },
});
