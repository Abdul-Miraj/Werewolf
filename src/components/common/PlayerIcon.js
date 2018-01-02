import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';

showTeam = (myRole, role) => {
    let show = true;
    if (myRole == 'Bodyguard') {
        return show;
    }
    if (myRole == role) {
        show = false;
    }
    return show;
};

// Component to create icon card
const PlayerIcon = (props) => {
    const { id, name, role } = props.player;
    return (
        <TouchableOpacity key={id} onPress={() => console.log(role)}>
            <View key={id} style={showTeam(props.myRole, role) ? styles.container : styles.hide}>
                <Text key={id} style={styles.name}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

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
    hide: {
        width: 0,
        height: 0
    }
};

export default PlayerIcon;
