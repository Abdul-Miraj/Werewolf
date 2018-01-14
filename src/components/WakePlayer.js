import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import CountdownCircle from 'react-native-countdown-circle';
import roles from '../reducers/RoleList.json';
import PlayerSelection from './PlayerSelection';


// Component displays description timer and decision
class WakePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionData: '',
        };
    }

    shouldComponentUpdate() {
        return false;
    }

    // get the ID of the player selected back
    myCallback = (dataFromChild) => {
        this.setState({ selectionData: dataFromChild });
    }

    render() {
        const { header, highlight, timer, night, selection } = styles;
        let roleIndex = roles.findIndex(x => x.role == this.props.role);
        const role = roles[roleIndex];
        return (
            <View style={{ flex: 1 }} >
                <View style={{ paddingTop: 40, flexDirection: 'row' }}>
                    <Text style={header}>
                        <Text style={highlight} >{role.role}</Text>: {role.description}
                    </Text>
                    <View style={timer}>
                        <CountdownCircle
                            seconds={10}
                            radius={25}
                            borderWidth={4}
                            color="#4fd09a"
                            bgColor="#222c31"
                            textStyle={{ fontSize: 20, color: '#4fd09a' }}
                            onTimeElapsed={() => {
                                const night_state = {
                                    role: this.props.role,
                                    value: this.state.selectionData
                                }
                                // emit to the server
                                const data = {
                                    action: "NIGHT-STATE-UPDATED",
                                    room_id: this.props.room,
                                    data: night_state
                                }

                                this.props.socket.emit('send-event-all', data);
                                this.props.updateNight(night_state);
                            }} // update the state of the players woken up
                        />
                    </View>

                </View>
                <View style={night}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <PlayerSelection callbackFromParent={this.myCallback} players={this.props.players} role={this.props.role} />
                    </ScrollView>
                    <View style={selection}>
                        <Text style={highlight} >
                            You have selected {this.state.selectionData == "" ? this.state.selectionData + "" : this.props.night}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    night: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '80%',
        padding: 20,
        paddingTop: 10,
        fontWeight: '500',
        color: '#fff',
        fontSize: 18,
        textAlign: 'left'
    },
    timer: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        paddingTop: 0
    },
    highlight: {
        fontSize: 22,
        color: '#4fd09a'
    },
    selection: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 8
    }
};

const mapStateToProps = state => {
    return {
        players: state.players,
        socket: state.socket,
        room: state.room
    };
};

export default connect(mapStateToProps, actions)(WakePlayer);
