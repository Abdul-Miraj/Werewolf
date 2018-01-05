import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Background from './common/Background';
import Btn from './common/Button';

// Home screen that imports all components
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: 0,
            error: ''
        };
    }

    submit = values => {
        console.log('submitting form', values);
        // check to see if the fields are non empty
        const name = values['Name'];
        if ((name == null) || (name.length < 2)) {
            this.setState({ error: 'Name Field Invalid' });
        } else {
            this.setState({ error: '' });
            // update the redux state with name and room code
            this.props.setUser(name);
            this.props.navigation.navigate('Lobby');
        }
    };

    renderInput = ({ input: { onChange, ...restInput } }) => {
        return (
            <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                style={styles.TextBox}
                onChangeText={onChange}
                placeholder={restInput.name}
                maxLength={restInput.name == 'Room Code' ? 5 : 10}
                {...restInput} />
        );
    }

    // render component when you join game
    joinRoom = () => {
        return (
            <View>
                <Field
                    name='Name'
                    component={this.renderInput}
                />
                <Field
                    name='Room Code'
                    component={this.renderInput}
                />
                <View style={styles.btnContainer}>
                    <Btn text="Join" onPress={this.props.handleSubmit(this.submit)} />
                    <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
                </View>
            </View>
        );
    };

    // render component when you create game
    createRoom = () => {
        return (
            <View>
                <Field
                    name='Name'
                    component={this.renderInput}
                />
                <View style={styles.btnContainer}>
                    <Btn text="Create" onPress={this.props.handleSubmit(this.submit)} />
                    <Btn text="Back" onPress={() => this.setState({ render: 0 })} />
                </View>
            </View>
        );
    };

    // default buttons to render
    renderDefault = () => {
        return (
            <View style={styles.btnContainer}>
                <Btn text="New Game" onPress={() => this.setState({ render: 1 })} />
                <Btn text="Join Game" onPress={() => this.setState({ render: 2 })} />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Background uri={require('../img/Bg.jpg')}>
                    <Text style={styles.Title}>Werewolf</Text>
                    {this.state.render == '0' ? this.renderDefault() : null}
                    {this.state.render == '1' ? this.createRoom() : null}
                    {this.state.render == '2' ? this.joinRoom() : null}
                    <Text style={styles.error} >{this.state.error}</Text>
                </Background>
            </View>
        );
    };
}

const styles = {
    container: {
        flex: 1,
    },
    Title: {
        alignSelf: 'center',
        margin: 50,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
    },
    btnContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    TextBox: {
        height: 40,
        borderWidth: 2,
        paddingLeft: 10,
        color: '#fff',
        borderColor: '#fff',
        borderRadius: 5,
        margin: 10
    },
    error: {
        color: '#f0f0f0',
        fontWeight: '600'
    }
};

const mapStateToProps = state => {
    return {
        user: state.username,
    };
};

// Hide the navigation
Home.navigationOptions = {
    header: null,
};

export default reduxForm({
    form: 'Room'
})(connect(mapStateToProps, actions)(Home));