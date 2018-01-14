import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PlayerSelection from './PlayerSelection';
import ButtonSet from './common/ButtonSet';
import * as actions from '../actions';
import io from 'socket.io-client';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import roles from '../reducers/RoleList.json';

// Component thats displays a list of players in lobby
class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,//props.navigation.state.params.socket,
            playerIndex: 0,//props.players.findIndex(x => x.id == props.id),
            isHost: true
        };
    }

    // update the state for all players 
    componentDidMount() {
        this.isHost();
        const { socket, playerIndex } = this.state;
        socket.on('player-joined-lobby', res => {
            /*
            
                WE NEED TO ADD NEW VOTE FIELD
            
            */
            this.props.addPlayer({ id: res.socket_id, name: res.player_name, role: '', isDead: false, isHost: false });
            let name = "";
            if (this.props.players[playerIndex] !== undefined) {
                name = this.props.players[playerIndex].name;
            }
            socket.emit('send-event-single', { action: "UPDATE-LOBBY", socket_id: res.socket_id, data: { socket_id: this.props.players[this.state.playerIndex].id, player_name: name } });
        });

        socket.on('new-event-single', res => {
            if (res.action == "HOST-TRANSFER") {
                let newIndex = this.props.players.findIndex(x => x.id == res.data.socket_id);
                this.props.players[newIndex].isHost = true;
                // update the button to true
                if (res.data.socket_id === this.props.id) {
                    this.setState({ isHost: false });
                }
            }

            else if (res.action == "UPDATE-LOBBY") {
                this.props.addPlayer({ id: res.data.socket_id, name: res.data.player_name, role: '', isDead: false, isHost: false });
            }
        });

        socket.on('new-event-all', res => {
            if ('PLAYER-HAS-LEFT-ROOM' == res.action) {
                // delete player from state object
                this.props.removePlayer(this.props.players.findIndex(x => x.id == res.data.id));
            }
            else if ('STARTING-GAME' == res.action) {
                // change state
                this.props.assignRoles(res.data.roles);
                this.props.navigation.dispatch({ type: 'Roles' });
            }

        });
    }

    // check to see if you are host 
    isHost = () => {
        if (this.props.players[this.state.playerIndex] !== undefined) {
            if (this.props.players[this.state.playerIndex].isHost) {
                this.setState({ isHost: false });
            }
        }
    }

    // convert arrary of objects into array of names
    assignRole = () => {
        let players = this.props.players;
        // shuffle the players
        shuffle(players);
        // assign the roles and update the array
        for (let i = 0; i < players.length; i++) {
            players[i].role = roles[i].role;
        }
    };

    // when host starts game assign the roles
    startGame = () => {
        // assign the roles to each player
        this.assignRole();
        const updatedState = this.props.players;

        const data = {
            action: "STARTING-GAME",
            room_id: this.props.room,
            data: { roles: updatedState }
        };
        // send the assigned roles to every client
        this.state.socket.emit('send-event-all', data);

        // go to the roles screen
        this.props.navigation.dispatch({ type: 'Roles' });
    };

    // disconnect and update state when you leave game
    leaveGame = () => {
        // notify all other sockets that this socket is leaving the room.
        const data = {
            action: "PLAYER-HAS-LEFT-ROOM",
            room_id: this.props.room,
            data: { id: this.props.id }
        }

        this.state.socket.emit('send-event-all', data)

        // transfer host if current one leaves
        if (this.props.players[this.state.playerIndex] != undefined) {
            if (this.props.players[this.state.playerIndex].isHost) {
                if (this.props.players.length > 1) {
                    let sid = this.props.players[(this.state.playerIndex + 1) % this.props.players.length];
                    let index = this.props.players.findIndex(x => x.id == sid.id);

                    this.state.socket.emit('send-event-single', { action: "HOST-TRANSFER", data: { socket_id: sid.id }, socket_id: sid.id });
                }
            }
        }
        this.state.socket.disconnect();
        this.props.setRoom('');

        // ASYNC FUNCTION!
        this.props.resetState();
        this.props.navigation.dispatch({ type: 'Back' });
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{ alignItems: 'center', padding: 30, paddingTop: 40 }}>
                    <Text style={styles.header}>Waiting for players!</Text>
                    <Text style={styles.room} >Room Code: {this.props.room}</Text>
                </View>
                <PlayerSelection players={this.props.players} role={null} />
                <ButtonSet
                    isDisabled={this.state.isHost}
                    btnTextOne="Start Game"
                    btnPressOne={() => this.startGame()}
                    btnTextTwo="Leave Game"
                    btnPressTwo={() => this.leaveGame()}
                />
            </View>
        );
    };
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#222c31',
        paddingBottom: 10
    },
    header: {
        color: '#f0f0f0',
        fontSize: 26
    },
    room: {
        color: '#f0f0f0',
        fontSize: 18
    }
};

const mapStateToProps = state => {
    return {
        id: state.id,
        room: state.room,
        players: state.players,
        room: state.room,
        socket: state.socket
    };
};

// Hide the navigation
Lobby.navigationOptions = {
    header: null,
};

export default connect(mapStateToProps, actions)(Lobby);
