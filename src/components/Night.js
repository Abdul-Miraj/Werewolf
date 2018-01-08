import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import * as actions from '../actions';
import CountdownCircle from 'react-native-countdown-circle';
import PlayerSelection from './PlayerSelection';
import shuffle from 'shuffle-array';
import WakePlayer from './WakePlayer';
import roles from '../reducers/RoleList.json';

/**
 *  Night, component to wake players
 */
class Night extends Component {
    constructor(props) {
        super(props);
        this.state = {
            night: 1,
            isWoke: true, // default false
            awakeRole: 'Werewolf',
            id: props.id
        };
    }

    /**
     *  {
     *      Night: 1
     *      Seer: ''
     *      Bodyguard: ''
     *      Werewolf: ''
     *  }
     */

    // create the new info object and pass to server each time 
    componentDidMount() {
        shuffle(this.props.players);
        const night = {
            Night: this.state.night
        };
        this.props.players.map(player => {
            if (player.isDead == false) {
                night[player.role] = '';
            }
        });
        console.log(this.props);
        this.props.addNight(night);
    }

    renderNight = () => {
        console.log(this.props);
        return (
            <View style={styles.night}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
                <CountdownCircle // for testing only
                    seconds={8}
                    radius={0}
                    onTimeElapsed={() => this.setState({
                        isWoke: !this.state.isWoke,
                        awakeRole: 'Bodyguard'
                    })} // update the state of the players woken up
                />
            </View>
        );
    };

    renderWake = () => {
        return (
            <WakePlayer night={this.props.night[this.state.awakeRole]} role={this.state.awakeRole}>
                <PlayerSelection players={this.props.players} role={this.state.awakeRole} />
            </WakePlayer>
        );
    };

    wakePlayer = () => {
        // if myrole is same as server then display selection
        let players = this.props.players;
        let playerIndex = players.findIndex(x => x.id == this.state.id);

        // loop through players see if  
        players.map(player => {
            console.log(player.role);
        });

        return true;//players[playerIndex].role == this.state.awakeRole;
    };

    render() {
        return (
            <View style={styles.container}>
                {this.wakePlayer() ? this.renderWake() : this.renderNight()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#222c31',
    },
    Title: {
        margin: 40,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    night: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

// Hide the navigation
Night.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        players: state.players,
        night: state.night,
        id: state.id,
    };
};

export default connect(mapStateToProps, actions)(Night);