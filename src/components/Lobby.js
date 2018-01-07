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

// Component thats displays a list of players in lobby
class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: props.navigation.state.params.socket,
            playerIndex: props.players.findIndex(x => x.name == props.username),
        };
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('player-joined-lobby', res => {
            this.props.addPlayer({ id: res.sender_socket_id, name: res.player_name, role: '' });
            socket.emit('update-lobby', { player_name: this.props.username, sender_socket_id: res.sender_socket_id, isDead: false, isHost: false });
        });
        socket.on('update-lobby', res => {
            this.props.addPlayer({ id: res.sender_socket_id, name: res.player_name, role: '', isDead: false, isHost: false});
        });
        socket.on('new-event-single', res => {
            console.log("0");
            if(res.action == "HOST-TRANSFER") {
                this.props.players[this.state.playerIndex].isHost = true;
                console.log("1");
            }
        });
    }

    isHost = () => {
        if (this.props.players[this.state.playerIndex] !== undefined) {
            return !(this.props.players[this.state.playerIndex].isHost);
        }
        return true;
    }

    leaveGame = () => {
        this.props.setRoom(null);
        if (this.props.players[this.state.playerIndex].isHost) {
            if(this.props.players.length > 1) {
                let sid = this.props.players[(this.state.playerIndex + 1)%this.props.players.length -1].id;
                console.log(sid);
                this.state.socket.emit('send-event-single', {action: "HOST-TRANSFER", data: {}, socket_id: sid});
            }
        }
        this.state.socket.emit('disconnect', {});
        this.props.removePlayer(this.state.playerIndex);
        console.log(this.props.players);
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
                    isDisabled={this.isHost()}
                    btnTextOne="Start Game"
                    btnPressOne={() => this.props.navigation.dispatch({ type: 'Roles' })}
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
        username: state.username,
        room: state.room,
        players: state.players,
        room: state.room,
    };
};

// Hide the navigation
Lobby.navigationOptions = {
    header: null,
};

export default connect(mapStateToProps, actions)(Lobby);
