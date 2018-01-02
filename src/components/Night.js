import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import PlayerSelection from './common/PlayerSelection';

// Home screen that imports all components
class Night extends Component {
    constructor(props) {
        super(props);
        this.state = {
            night: 1,
            isWoke: true, // default false
            wokenUp: [],
            order: ['werewolf', 'witch']
        };
    }

    // find the roles from order first

    // put the players woken up in the wokenUp array - villagers default

    // wake up the others

    // once the wokenUp array is same length as players go to day

    /*
    componentWillMount() {
        this._interval = setInterval(() => {
            // Check to see if everyone woke up once, 
            this.setState({
                isWoke: !this.state.isWoke,
            });
        }, 3000);
        console.log(this.props.players);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    } */

    renderNight = () => {
        return (
            <View style={styles.night}>
                <Text style={styles.Title}>Night {this.state.night}</Text>
            </View>
        );
    };

    wakePlayer = () => {
        return (
            <View>
                <View style={{ paddingTop: 40, flexDirection: 'row' }}>
                    <Text style={{ width: '80%', padding: 20, paddingTop: 10, fontWeight: '600', color: '#fff', fontSize: 18, textAlign: 'center' }}>
                        Select a player that you would like to investigate!
                    </Text>
                    <View style={{ flex: 1, alignSelf: 'flex-end', alignItems: 'flex-end', padding: 20, paddingTop: 0 }}>
                        <CountdownCircle
                            seconds={29}
                            radius={30}
                            borderWidth={4}
                            color="#4fd09a"
                            bgColor="#222c31"
                            textStyle={{ fontSize: 20, color: '#4fd09a' }}
                            onTimeElapsed={() => console.log('Elapsed!')} // update the state of the players woken up
                        />
                    </View>
                </View>
                <View style={styles.night} >
                    <PlayerSelection players={this.props.players} />
                    <Text>
                        You Have Chosen: Player 2
                    </Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.isWoke ? this.wakePlayer() : this.renderNight()}
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
    }
};

// Hide the navigation
Night.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps)(Night);