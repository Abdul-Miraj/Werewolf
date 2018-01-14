import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

// Start with routes: The Main screen.
const initialNavState = AppNavigator.router.getStateForAction('Home');

export default (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
        case 'Back':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ],
                }),
                state
            );
            break;
        case 'Roles':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Roles' }),
                state
            );
            break;
        case 'Night':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Night' }),
                state
            );
            break;
        case 'Lobby':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Lobby' }),
                state
            );
            break;
        case 'Day':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Day' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};
