import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Background from './common/Background';
import ButtonSet from './common/ButtonSet';
import io from 'socket.io-client'

// Home screen that imports all components
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: 0,
            error: '',
        };
    }

    // function to go to next screen and set the player name/room code
    callLobby = (roomCode, socket, name) => {
        this.props.setRoom(roomCode);
        const player = {
            "id": 3,
            "name": name,
            "isHost": false,
            "role": "",
            "isDead": false
        };
        this.props.addPlayer(player);
        this.props.navigation.navigate(
            'Lobby',
            { socket },
        );
    };

    submit = values => {
        // check to see if the fields are non empty
        const name = values['Name'];
        if ((name == null) || (name.length < 2)) {
            this.setState({ error: 'Name Field Invalid' });
        } else {

            // connection to server is intialized
            const socket = io('https://werewolf-server-1.herokuapp.com/');

            //{room ? null : null}
            this.setState({ error: '' });
            // update the redux state with name and room code
            this.props.setUser(name);

            // user is attempting to join a room
            if (values['Room Code'] != null) {
                const data = {
                    roomId: values['Room Code'],
                    playerName: name
                };
                socket.emit('join-room', data);
                // make into a function
                this.callLobby(values['Room Code'], socket, name);
            } else {
                // user is creating a room 
                socket.emit('create-room', null);
                // set the room code, and add the new player to the state once room is created
                socket.on('roomCreated', (rk) => {
                    this.callLobby(rk.room_id, socket, name);
                });
            }
        }
    };

    renderInput = ({ input: { onChange, ...restInput } }) => {
        return (
            <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                style={styles.TextBox}
                onChangeText={onChange}
                placeholder={restInput.name}
                autoCapitalize="characters"
                maxLength={restInput.name == 'Room Code' ? 5 : 10}
                {...restInput} />
        );
    }

    // render component when you join game
    joinRoom = () => {
        return (
            <View>
                <Field
                    name='Name'
                    component={this.renderInput}
                />
                <Field
                    name='Room Code'
                    component={this.renderInput}
                />
                <ButtonSet
                    btnTextOne="Join"
                    btnPressOne={this.props.handleSubmit(this.submit)}
                    btnTextTwo="Back"
                    btnPressTwo={() => this.setState({ render: 0 })}
                />
            </View>
        );
    };

    // render component when you create game
    createRoom = () => {
        return (
            <View>
                <Field
                    name='Name'
                    component={this.renderInput}
                />
                <ButtonSet
                    btnTextOne="Create"
                    btnPressOne={this.props.handleSubmit(this.submit)}
                    btnTextTwo="Back"
                    btnPressTwo={() => this.setState({ render: 0 })}
                />
            </View>
        );
    };

    // default buttons to render
    renderDefault = () => {
        return (
            <ButtonSet
                btnTextOne="New Game"
                btnPressOne={() => this.setState({ render: 1 })}
                btnTextTwo="Join Game"
                btnPressTwo={() => this.setState({ render: 2 })}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>
                    <Text style={styles.Title}>Werewolf</Text>
                    {this.state.render == '0' ? this.renderDefault() : null}
                    {this.state.render == '1' ? this.createRoom() : null}
                    {this.state.render == '2' ? this.joinRoom() : null}
                    <Text style={styles.error} >{this.state.error}</Text>
                </Background>
            </View>
        );
    };
}

const styles = {
    container: {
        flex: 1,
    },
    Title: {
        alignSelf: 'center',
        margin: 50,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    TextBox: {
        height: 40,
        borderWidth: 2,
        paddingLeft: 10,
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 5,
        margin: 10
    },
    error: {
        color: '#f0f0f0',
        fontWeight: '600'
    }
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};

export default reduxForm({
    form: 'Room'
})(connect(null, actions)(Home));