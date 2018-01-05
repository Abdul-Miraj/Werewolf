import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import PlayerIcon from './common/PlayerIcon';

// For each player create an icon card
renderIcons = (players, role) => {
    return (
        players.map(player => (
            <PlayerIcon key={player.id} player={player} myRole={role}/> // myRole is the role of the team that is awake
        ))
    );
};

// Component thats decide which players can be voted for
const PlayerSelection = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', }} >
            <View style={styles.container} >
                {this.renderIcons(props.players, props.role)}
            </View>
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
};

export default PlayerSelection;
