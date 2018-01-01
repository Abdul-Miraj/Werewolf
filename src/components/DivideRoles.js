import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import DivideCard from './common/DivideCard';
import RoleCard from './common/RoleCard';
import roles from '../reducers/RoleList.json';

// DivideRoles screen that imports all components
class DivideRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'OSAMAALHAQ', //should be passed down from props
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
                <View style={{ margin: 30, marginBottom: 10, paddingTop: 10 }}>
                    <Text style={styles.room}>
                        3YJX
                    </Text>
                    <Text style={styles.name}>
                        {this.state.username}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scroll} >
                    <DivideCard name='My Role:'>
                        <RoleCard roles={[this.assignRole()]} />
                    </DivideCard>
                    <DivideCard name='Roles:'>
                        <RoleCard roles={roles.slice(0, this.props.players.length)} />
                    </DivideCard>
                </ScrollView>
                <Text style={styles.gameText}>
                    Game is about to start in 15 seconds
                </Text>
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
    gameText: {
        fontSize: 16,
        alignSelf: 'center',
        padding: 10,
        color: '#FFF'
    }
};

// Hide the navigation
DivideRoles.navigationOptions = {
    header: null
    //headerTitle: '',
};

const mapStateToProps = state => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps)(DivideRoles);