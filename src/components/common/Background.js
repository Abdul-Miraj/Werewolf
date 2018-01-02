import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

// Component to display image ass full screen
export default class background extends Component {
    render() {
        return (
            <ImageBackground source={this.props.uri} style={styles.background} >
                <View style={styles.center} >{this.props.children}</View>
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
    }
});
