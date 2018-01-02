import React from 'react';
import { View, Text } from 'react-native';
import Background from './common/Background';
import Btn from './common/Button';


export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>
                    <Text style={styles.Title}>Create Room</Text>
                    <View style={styles.btnContainer}>
                        <Btn text="Create" onPress={() => this.props.navigation.navigate('Roles')} />
                    </View>
                </Background>
            </View>
        );
    }
}
