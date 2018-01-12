import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/**
 * Component that creates icons for each player.
 * Users are able to select the icons/tiles
 */
class PlayerIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myRole: props.myRole,
            player: props.player,
            isSelected: false,
        };
    }

    // Return true if you want to select yourself
    showTeam = () => {
        let show = true;
        // Roles that are able to select themselves
        if ((this.state.myRole == 'Bodyguard') || (this.state.myRole == 'Werewolf')) {
            return show;
        }
        // hide the player if the current role is myself
        if (this.state.myRole == this.state.player.role) {
            show = false;
        }
        return show;
    };

    // helper function to store data in state
    storeChoice = () => {
        // If you are the seer only see team not role
        if (this.state.myRole == 'Seer') {
            if (this.state.player.role != 'Werewolf') {
                return 'Villager';
            } else {
                return 'Werewolf';
            }
        } else if (this.state.myRole == 'Werewolf') {
            // ww: { selections: [], kill: "" }
            return this.state.player.name;
        } else {
            // return players name otherwise
            // { role: selection } format
            return this.state.player.name;
        }
    };

    // function that allows one selection
    allowSelect = () => {
        this.setState({ isSelected: true });
        this.props.updateNight({ role: this.state.myRole, value: this.storeChoice() });
        // send this.props.night to all players SERVER

    };

    // tile
    showCard = () => {
        return (
            <TouchableOpacity onPress={() => {
                // role is null in the lobby screen
                if (this.props.myRole != null) {
                    { this.props.night[this.state.myRole] == null ? this.allowSelect() : null }
                }
            }}>
                <View style={this.state.isSelected ? styles.selectedContainer : styles.container}>
                    <Text style={styles.name}>
                        {this.props.player.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    // Component to create icon card
    render() {
        return (
            <View>
                {this.showTeam() ? this.showCard() : null }
            </View>
        );
    }
}

const styles = {
    name: {
        fontSize: 16,
        fontWeight: '300',
        color: '#f0f0f0',
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#869c85',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        margin: 5
    },
    selectedContainer: {
        backgroundColor: '#869c85',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#4fd09a',
        margin: 5
    },
    hide: {
        width: 0,
        height: 0
    }
};

const mapStateToProps = state => {
    return {
        night: state.night
    };
};

export default connect(mapStateToProps, actions)(PlayerIcon);
