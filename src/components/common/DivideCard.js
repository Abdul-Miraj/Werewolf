import React from 'react';
import {
    Text,
    View,
    Dimensions,
} from 'react-native';

// Component to divide the role sections
const DivideCard = (props) => {
    return (
        <View>
            <View style={styles.bar}/>
            <Text style={styles.name}>
                {props.name}
            </Text>
            {props.children}
        </View>
    );
};

const styles = {
    name: {
        fontSize: 16,
        fontWeight: '300',
        color: '#f0f0f0'
    },
    bar: {
        width: '100%',//Dimensions.get('screen').width - 40,
        height: 2,
        backgroundColor: '#2a3238',
        margin: 10,
        marginTop: 20,
        alignSelf: 'center'
    }
};

export default DivideCard;
