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
            night: this.props.night[this.props.night.length - 1],
        };
    }

    componentWillMount() {
        let night = this.state.night;
        if (!('Bodyguard' in night) || (night['Bodyguard'] != night['Werewolf'])) {
            this.props.setDead(night['Werewolf']);
        }

        const vote = {
            day: this.state.Day
        };
        this.props.players.map(player => {
            if (player.isDead == false) {
                vote[player.id] = '';
            }
        });
        this.props.addDay(vote);
    }

    shouldComponentUpdate() {
        return false;
    }

    //gets callback from playerselection and increments vote
    myCallback = (dataFromChild) => {
        const day_state = {
            id: this.state.id,
            value: dataFromChild
        }
        this.props.updateDay(day_state);
        console.log("DAY: ", this.props.day);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Day}>
                    <Text style={styles.Title}>Day{this.state.Day}</Text>
                    <PlayerSelection callbackFromParent={this.myCallback} players={this.props.players} day={ true }/>
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
    timer: {
        flex: 1,
        paddingTop: 40,
        paddingRight: 25,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
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
        day: state.day,
    };
};

export default connect(mapStateToProps, actions)(Day);