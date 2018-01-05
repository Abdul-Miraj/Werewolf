import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PlayerSelection from './PlayerSelection';
import ButtonSet from './common/ButtonSet';

// Component thats displays a list of players in lobby
const Lobby = (props) => {
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'center', padding: 30, paddingTop: 40 }}>
                <Text style={styles.header}>Waiting for players!</Text>
                <Text style={styles.room} >Room Code: {props.room}</Text>
            </View>
            <PlayerSelection players={props.players} role={null} />
            <ButtonSet
                btnTextOne="Start Game"
                btnPressOne={() => props.dispatch({ type: 'Roles' })}
                btnTextTwo="Leave Game"
                btnPressTwo={() => props.navigation.dispatch(NavigationActions.back())}
            />
        </View>
    );
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
        players: state.players
    };
};


// Hide the navigation
Lobby.navigationOptions = {
    header: null,
};

export default connect(mapStateToProps)(Lobby);
