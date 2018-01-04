import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import * as actions from '../actions';
import CountdownCircle from 'react-native-countdown-circle';
import PlayerSelection from './PlayerSelection';
import shuffle from 'shuffle-array';
import roles from '../reducers/RoleList.json';

// Home screen that imports all components
class Night extends Component {
    constructor(props) {
        super(props);
        this.state = {
            night: 1,
            isWoke: true, // default false
            serverRole: 'Seer',
            username: 'OSAMAALHAQ'
        };
    }

    // Get my player object based on my username

    // Get the role object

    // check if the role server gave matches my role

    componentDidMount() {
        console.log(this.props);
        shuffle(this.props.players);
        const night = {
            Night: this.state.night
        };
        this.props.players.map(player => {
            if (player.isDead == false) {
                night[player.role] = '';
            }
        });
        this.props.addNight(night);
    }

    renderNight = () => {
        console.log(this.props);
        return (
            <View style={styles.night}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
                <CountdownCircle
                    seconds={8}
                    radius={0}
                    onTimeElapsed={() => this.setState({
                        isWoke: !this.state.isWoke,
                        serverRole: 'Bodyguard'
                    })} // update the state of the players woken up
                />
            </View>
        );
    };

    renderWake = () => {
        const { header, highlight, timer, night, selection } = styles;
        let roleIndex = roles.findIndex(x => x.role == this.state.serverRole);
        const role = roles[roleIndex];
        return (
            <View style={{ flex: 1 }} >
                <View style={{ paddingTop: 40, flexDirection: 'row' }}>
                    <Text style={header}>
                        <Text style={highlight} >{role.role}</Text>:  {role.description}
                    </Text>
                    <View style={timer}>
                        <CountdownCircle
                            seconds={10}
                            radius={25}
                            borderWidth={4}
                            color="#4fd09a"
                            bgColor="#222c31"
                            textStyle={{ fontSize: 20, color: '#4fd09a' }}
                            onTimeElapsed={() => this.setState({
                                isWoke: !this.state.isWoke,
                            })} // update the state of the players woken up
                        />
                    </View>
                </View>
                <View style={night}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <PlayerSelection players={this.props.players} role={this.state.serverRole} />
                    </ScrollView>
                    <View style={selection}>
                        <Text style={highlight} >
                            You have selected {this.props.night[this.state.serverRole] == null ? '' : this.props.night[this.state.serverRole]}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    wakePlayer = () => {
        // if myrole is same as server then display selection
        let players = this.props.players;
        let playerIndex = players.findIndex(x => x.name == this.state.username);
        return players[playerIndex].role == this.state.serverRole;
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

// Hide the navigation
Night.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        players: state.players,
        night: state.night
    };
};

export default connect(mapStateToProps, actions)(Night);