import React from 'react';
import {
    Text,
    View
} from 'react-native';

// Create the icon/template
createCard = (roles) => {
    return (
        roles.map(role => (
            <Text key={role} style={styles.name} >
                {role}
            </Text>
        ))
    );
};

// Component to help style an arrary of roles
const RoleCard = (props) => {
    return (
        <View style={styles.icon}>
            {createCard(props.roles)}
        </View>
    );
};

const styles = {
    name: {
        fontSize: 16,
        fontWeight: '300',
        color: '#f0f0f0',
        padding: 10
    },
    icon: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default RoleCard;
