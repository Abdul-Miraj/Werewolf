import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';

// Component to divide the role sections
const PlayerSelection = (props) => {
    return (
        <View style={{ flex: 1 }} >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <TouchableWithoutFeedback>
                    <View style={styles.containerBorder}>
                        <View style={styles.container}>
                            <Text style={styles.name}>
                                Player 1
                    </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.containerBorder}>
                    <View style={styles.container}>
                        <Text style={styles.name}>
                            Player 2
                    </Text>
                    </View>
                </View>
                <View style={styles.containerBorder}>
                    <View style={styles.container}>
                        <Text style={styles.name}>
                            Player 3
                    </Text>
                    </View>
                </View>
                <View style={styles.containerBorder}>
                    <View style={styles.container}>
                        <Text style={styles.name}>
                            Player 4
                    </Text>
                    </View>
                </View>
            </View>
        </View>
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
        height: 94,
        width: 94,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBorder: {
        margin: 5,
        backgroundColor: '#fff',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default PlayerSelection;
