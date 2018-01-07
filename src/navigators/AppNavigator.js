import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import {
    addNavigationHelpers, NavigationActions,
    StackNavigator, TabNavigator
} from 'react-navigation';
import Home from '../components/Home';
import DivideRoles from '../components/DivideRoles';
import Night from '../components/Night';
import Lobby from '../components/Lobby';

// Put each screen here
export const AppNavigator = StackNavigator({
    Home: { screen: Home },
    Roles: { screen: DivideRoles },
    Night: { screen: Night },
    Lobby: { screen: Lobby },
});

// wire up the Android back button
class AppWithNavigationState extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        // when back button is pressed go home, erase players and connection
        dispatch({ type: 'Home' })
        return true;
    };
    render() {
        const { dispatch, nav } = this.props;
        return (
            <AppNavigator
                navigation={addNavigationHelpers({ dispatch, state: nav })}
            />
        );
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);