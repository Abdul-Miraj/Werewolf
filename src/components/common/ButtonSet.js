import React from 'react';
import {
    View
} from 'react-native';
import Btn from './Button';

// component that bundles the two buttons into one
const WakePlayer = (props) => {
    return (
        <View style={styles.btnContainer}>
            <Btn text={props.btnTextOne} onPress={props.btnPressOne} />
            <Btn text={props.btnTextTwo} onPress={props.btnPressTwo} />
        </View>

    );
};

const styles = {
    btnContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
};

export default WakePlayer;
