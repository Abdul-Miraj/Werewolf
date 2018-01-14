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
            players: props.players,
            night: props.night[props.night.length - 1],
        };
    }

    componentWillMount() {
        // mark the player as dead if killed at night
        let night = this.state.night;
        // check to see if bodyguard protected who the wolves killed
        if (!('Bodyguard' in night) || (night['Bodyguard'] != night['Werewolf'])) {
            this.props.setDead(night['Werewolf']);
        }
        // check to see if game is over

        // create the vote object to keep track of who the players voted for
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

    //gets callback from playerselection and update vote
    myCallback = (dataFromChild) => {
        const day_state = {
            id: this.state.id,
            value: dataFromChild
        }
        this.props.updateDay(day_state);
    }

    // check to see if you are dead
    isDead = () => {
        let playerIndex = this.state.players.findIndex(x => x.id == this.state.id);
        if (this.props.players[playerIndex].isDead) {
            return true;
        } else {
            return false;
        }
    }

    // check if game is over
    isGameOver = () => {

    }

    // if you are dead dont display vote
    renderDead = () => {
        return (
            <View style={styles.Day}>
                <Text style={styles.Title}>Day {this.state.Day}</Text>
            </View>
        );
    }

    // display voting screen
    renderDay = () => {
        return (
            <View style={styles.dead}>
                <PlayerSelection callbackFromParent={this.myCallback} players={this.props.players} day={true} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.isDead() ? this.renderDead() : this.renderDay()}
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
    dead: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
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
        day: state.day,
    };
};

export default connect(mapStateToProps, actions)(Day);