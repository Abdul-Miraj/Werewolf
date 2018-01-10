import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import * as actions from '../actions';
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
            awakeRole: 'Werewolf',
            id: props.id,
        };
    }

    // create the new info object and pass to server each time 
    componentWillMount() {
        shuffle(this.props.players);
        const night = {
            Night: this.state.night
        };
        this.props.players.map(player => {
            if ((player.isDead == false) && (player.role != 'Villager')) {
                night[player.role] = '';
            }
        });
        this.props.addNight(night);
    }

    renderNight = () => {
        return (
            <View style={styles.night}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
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
        let wakeUp = '';
        let nightObj = this.props.night[this.props.night.length -1];
        console.log("Night: ", nightObj);
        if (nightObj != undefined) {
            // iterate though each role to see which hasnt woken up
            for (let i = 0; i < roles.length; i++) {
                if (nightObj[roles[i].role] == "") {
                    wakeUp = roles[i].role;
                    break;
                }
            }
        }
        if (wakeUp == '') {
            // render day
        }
        // if role to wake up matches my role return true
        return players[playerIndex].role == wakeUp;
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