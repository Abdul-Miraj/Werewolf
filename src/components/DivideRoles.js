import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import shuffle from 'shuffle-array';
import DivideCard from './common/DivideCard';
import RoleCard from './common/RoleCard';

// DivideRoles screen that imports all components
class DivideRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'OSAMAALHAQ', //should be passed down from props
            roles: ['Werewolf', 'Villager', 'Villager', 'Bodyguard', 'Seer', 'Hunter', 'Witch', 'Werewolf']
        };
    }
    // convert arrary of objects into array of names
    assignRole = () => {
        let players = _.map(this.props.players, 'name');
        shuffle(players);
        // get the index of my username and assign it the role
        let index = players.indexOf(this.state.username);
        return this.state.roles[index];
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.background}>
                    <Text style={styles.room}>
                        3YJX
                    </Text>
                    <Text style={styles.name}>
                        {this.state.username}
                    </Text>
                    <DivideCard name='My Role:'>
                        <RoleCard roles={[this.assignRole()]} />
                    </DivideCard>
                    <DivideCard name='Roles:'>
                        <RoleCard roles={this.state.roles} />
                    </DivideCard>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#2a3238'
    },
    background: {
        flex: 1,
        backgroundColor: '#222c31',
        marginTop: 20,
        padding: 20
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
    }
};

// Hide the navigation
DivideRoles.navigationOptions = {
    headerTitle: '',
};

const mapStateToProps = state => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps)(DivideRoles);