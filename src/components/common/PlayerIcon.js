import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class PlayerIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myRole: props.myRole,
            player: props.player,
            isSelected: false,
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
        };
    }


    // Return true if you want to select yourself
    showTeam = () => {
        let show = true;
        // Bodygurad is able to select themselves
        if (this.state.myRole == 'Bodyguard') {
            return show;
        }
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

        } else {
            // return players name otherwise
            return this.state.player.name;
        }
    };

    // function that allows one selection
    allowSelect = () => {
        this.setState({ container: styles.container });
        this.props.updateNight({ role: this.state.myRole, value: this.storeChoice() });
    };

    // Component to create icon card
    render() {
        const { id, name } = this.state.player;
        return (
            <TouchableOpacity onPress={() => {
                if (this.props.myRole != null) {
                    { this.props.night[this.state.myRole] == null ? this.allowSelect() : null }
                }
            }}>
                <View style={this.showTeam() ? this.state.container : styles.hide}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
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
