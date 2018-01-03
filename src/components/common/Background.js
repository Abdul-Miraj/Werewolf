import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';

// Component to display image ass full screen
export default class background extends Component {
    render() {
        return (
            <ImageBackground source={this.props.uri} style={styles.background} >
                <View style={styles.center} >{this.props.children}</View>
                <View style={styles.dev}>
                    <Text style={{ color: '#fff' }}>
                        Developed by Fauzan, Osama, Obaid
                    </Text>
                </View>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 180
    },
    dev: {
        margin: 20,
        alignItems: 'center'
    }
});
