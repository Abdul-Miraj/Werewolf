import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import DivideCard from './common/DivideCard';
import RoleCard from './common/RoleCard';
import roles from '../reducers/RoleList.json';
import CountdownCircle from 'react-native-countdown-circle';

// DivideRoles screen that imports all components
class DivideRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            room: props.room,
        };
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
        // modify the player state

        // get the index of my username
        let playerIndex = players.findIndex(x => x.name == this.state.username);
        // get the index of my role and return that object
        let roleIndex = roles.findIndex(x => x.role == players[playerIndex].role);
        return roles[roleIndex];
    };

    render() {
        return (
            <View style={styles.container} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 30, marginBottom: 10, paddingTop: 10 }}>
                        <Text style={styles.room}>
                            {this.state.room}
                        </Text>
                        <Text style={styles.name}>
                            {this.state.username}
                        </Text>
                    </View>
                    <View style={styles.timer}>
                        <CountdownCircle
                            seconds={4}
                            radius={25}
                            borderWidth={4}
                            color="#4fd09a"
                            bgColor="#222c31"
                            textStyle={{ fontSize: 20, color: '#4fd09a' }}
                            onTimeElapsed={() => this.props.dispatch({ type: 'Night' })} // update the state of the players woken up
                        />
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scroll} >
                    <DivideCard name='My Role:'>
                        <RoleCard roles={[this.assignRole()]} />
                    </DivideCard>
                    <DivideCard name='Roles:'>
                        <RoleCard roles={roles.slice(0, this.props.players.length)} />
                    </DivideCard>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#222c31',
    },
    scroll: {
        paddingTop: 0,
        padding: 30
    },
    room: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4fd09a'
    },
    name: {
        fontSize: 16,
        fontWeight: '300',
        color: '#f0f0f0'
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
DivideRoles.navigationOptions = {
    header: null
};

const mapStateToProps = state => {
    return {
        players: state.players,
        username: state.username,
        room: state.room
    };
};

export default connect(mapStateToProps)(DivideRoles);