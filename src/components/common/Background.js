import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

// Component to display image ass full screen
export default class background extends Component {
    render() {
        return (
            <ImageBackground source={this.props.uri} style={styles.background} >
                {this.props.children}
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
});
