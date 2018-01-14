import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import * as actions from '../actions';
import _ from 'lodash';
import CountdownCircle from 'react-native-countdown-circle';
import PlayerSelection from './PlayerSelection';
import ButtonSet from './common/ButtonSet';
import { setRoom } from '../actions';

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
        this.isGameOver();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        const { socket, setRoom, resetState } = this.props;
        socket.disconnect();
        setRoom('');
        resetState();
    }

    //gets callback from playerselection and update vote
    myCallback = (dataFromChild) => {
        const day_state = {
            id: this.state.id,
            value: dataFromChild
        }
        this.props.updateDay(day_state);
        console.log("DAY: ", this.props.day);
    }

    voteNight = () => {
        // once everyone has voted go to night
        this.props.navigation.dispatch({ type: 'Night' });
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
        // create array of roles based on players alive
        const playersAlive = _.filter(this.props.players, function (o) { return !o.isDead; });
        const roleArray = _.map(playersAlive, 'role');
        // array of wolves alive
        const werewolves = _.remove(roleArray, function (n) {
            return n == 'Werewolf';
        });
        // number of villagers
        const villagers = playersAlive.length - werewolves.length;
        // check to see if all wolves are dead
        if (werewolves.length == 0) {
            console.log("Villagers Win!");
            return true;
        // if more wolves than villagers WW win
        } else if (villagers <= werewolves.length) {
            console.log("Werewolves Win!");
            return true;
        }
        return false;
    }

    // if you are dead dont display vote
    renderDead = () => {
        return (
            <View style={styles.Day}>
                <Text style={styles.Title}>You have been killed.</Text>
            </View>
        );
    }

    // display voting screen
    renderDay = () => {
        return (
            <View style={styles.Day}>
                <Text style={styles.Title}>Day 1</Text>
                <PlayerSelection callbackFromParent={this.myCallback} players={this.props.players} day={true} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.isDead() ? this.renderDead() : this.renderDay()}
                <ButtonSet
                    isDisabled={this.isDead()}
                    btnTextOne="Start Night"
                    btnPressOne={() => this.voteNight()}
                    btnTextTwo="Leave Game"
                    btnPressTwo={() => this.props.navigation.dispatch({ type: 'Back' })}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#a7b4a0',
        paddingBottom: 10
    },
    Title: {
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
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
        day: state.day,
        room: state.room,
        socket: state.socket
    };
};

export default connect(mapStateToProps, actions)(Day);