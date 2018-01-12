import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import * as actions from '../actions';
import CountdownCircle from 'react-native-countdown-circle';
import PlayerSelection from './PlayerSelection';

/**
 *  Day, component to wake players
 */
class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Day: 1,
            id: props.id,
            night: this.props.night[this.props.night.length -1]
        };
    }

    whoDied = () => {
        const { night } = this.state;
        if ('Bodyguard' in night) {
            // if bg protected who the wolves killed
            if (night['Bodyguard'] == night['Werewolf']) {
                night['Werewolf'] = '';
            }
        }
        return(night['Werewolf']);
    }

    render() {
        console.log("DIED: ", this.whoDied());
        console.log("NIGHT",this.props.night);
        return (
            <View style={styles.container}>
                <View style={styles.Day}>
                    <Text style={styles.Title}>Day {this.state.Day}</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#a7b4a0',
    },
    Title: {
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    Day: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

// Hide the navigation
Day.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        players: state.players,
        night: state.night,
        id: state.id,
    };
};

export default connect(mapStateToProps, actions)(Day);