import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import { Button } from './common';
import appIcon from '../images/appIcon.png'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, login } from '../actions';


const { width, height } = Dimensions.get('window');

class Login extends Component {

    onButtonClick = () => {
        const {email, password} = this.props;
        this.props.login(email, password);
    }

    onEmailChanged = (text) => {
        this.props.emailChanged(text);
    }

    onPasswordChanged = (text) => {
        this.props.passwordChanged(text);
    }

    render() {
        const {error, loading} = this.props;

        const errorMessage = error ? (<Text style={styles.errorText}>{error}</Text>) : null;

        return (
            <View style={styles.container}>

                <Image source={appIcon}/> 

                <View style={styles.inputView}>
                    <TextInput value={this.props.email} onChangeText={this.onEmailChanged} placeholder='Email' style={styles.textInput}></TextInput>
                    <TextInput value={this.props.password} onChangeText={this.onPasswordChanged} placeholder='Password' style={styles.textInput} secureTextEntry ></TextInput>
                </View>

                {errorMessage}

                <View style={styles.addButtonView}>
                    <Button spinner={loading} onPress={this.onButtonClick}>LOGIN</Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5f27cd',
    },
    inputView: {
        paddingTop: 5,
        height: height * 0.25,
        justifyContent: 'center',
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 8,
        paddingRight: 7,
        height: 40,
        width: width * 0.7
    },
    addButtonView: {
        height: height * 0.07,
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
        marginTop: 20,
        marginBottom: 70,
    },
    errorText: {
        color: 'white',
        fontSize: 15,
        paddingTop: 5,
        alignSelf: 'center',
    }
})

const mapStateToProps = state => {
    const {email, password, loading, error} = state.auth;
    return {email, password, loading, error}
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, login })(Login);