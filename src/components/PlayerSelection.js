import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import PlayerIcon from './common/PlayerIcon';

// Takes an array of player objects and creates icons
class PlayerSelection extends Component {

    // For each player create an icon card
    renderIcons = (players, role) => {
        return (
            players.map(player => {
                console.log(player);
                if (player.isDead === false) {
                    return (
                        <PlayerIcon
                            callbackFromParent={this.myCallback}
                            key={player.id}
                            player={player}
                            myRole={role} // myRole is the role of the team that is awake
                        />
                    )
                }
            })
        );
    };

    // pass the data back to WakePlayer
    myCallback = (dataFromChild) => {
        // pass data back if there are any
        if (dataFromChild) {
            this.props.callbackFromParent(dataFromChild);
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} >
                <View style={styles.container} >
                    {this.renderIcons(this.props.players, this.props.role)}
                </View>
            </ScrollView>
        );
    }
}

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
