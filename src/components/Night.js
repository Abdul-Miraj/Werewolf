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

    // create the new night object and pass to server each time 
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

    // when user votes update their screen to display night 
    componentWillReceiveProps(nextProps) {
        if (this.props.night != nextProps.night) {
            console.log("PROPS: ", nextProps.night);
            let wakeUp = '';
            let nightObj = nextProps.night[nextProps.night.length - 1];
            if (nightObj != undefined) {
                // iterate though each role to see which hasnt woken up
                for (let i = 0; i < roles.length; i++) {
                    if (nightObj[roles[i].role] == "") {
                        this.setState({ awakeRole: roles[i].role });
                        wakeUp = roles[i].role;
                        break;
                    }
                }
            }
            // go to day once everyone has been called
            if (wakeUp == '') {
                this.props.navigation.dispatch({ type: 'Day' });
            }
        }
    }

    // functino to display night screen
    renderNight = () => {
        return (
            <View style={styles.night}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
            </View>
        );
    };

    // functino that passes called role and lets players do selection
    renderWake = () => {
        return (
            <WakePlayer night={this.props.night[this.state.awakeRole]} role={this.state.awakeRole}>
                <PlayerSelection players={this.props.players} role={this.state.awakeRole} />
            </WakePlayer>
        );
    };

    // function to check if my role has been called
    wakePlayer = () => {
        // if myrole is same as server then display selection
        let players = this.props.players;
        let playerIndex = players.findIndex(x => x.id == this.state.id);
        // if role to wake up matches my role return true
        return players[playerIndex].role == this.state.awakeRole;
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