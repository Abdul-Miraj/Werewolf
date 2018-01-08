import React from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import roles from '../reducers/RoleList.json';

// Component displays description timer and decision
const WakePlayer = (props) => {
    const { header, highlight, timer, night, selection } = styles;
    let roleIndex = roles.findIndex(x => x.role == props.role);
    const role = roles[roleIndex];
    return (
        <View style={{ flex: 1 }} >
            <View style={{ paddingTop: 40, flexDirection: 'row' }}>
                <Text style={header}>
                <Text style={highlight} >{role.role}</Text>: {role.description}
                </Text>
                <View style={timer}>
                    <CountdownCircle
                        seconds={10}
                        radius={25}
                        borderWidth={4}
                        color="#4fd09a"
                        bgColor="#222c31"
                        textStyle={{ fontSize: 20, color: '#4fd09a' }}
                        onTimeElapsed={() => console.log('Timer ended')} // update the state of the players woken up
                    />
                </View>
            </View>
            <View style={night}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    {props.children}
                </ScrollView>
                <View style={selection}>
                    <Text style={highlight} >
                        You have selected {props.night == null ? '' : props.night}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    night: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '80%',
        padding: 20,
        paddingTop: 10,
        fontWeight: '500',
        color: '#fff',
        fontSize: 18,
        textAlign: 'left'
    },
    timer: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        paddingTop: 0
    },
    highlight: {
        fontSize: 22,
        color: '#4fd09a'
    },
    selection: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 8
    }
};

export default WakePlayer;
