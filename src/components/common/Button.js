import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Spinner } from './Spinner';
const { height, width } = Dimensions.get('window');

const Button = (props) => {
    const content = props.spinner ? (<Spinner />) : (
        <Text style={styles.buttonText}>{props.children}</Text>
    )

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={styles.buttonStyle} >
            {content}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#27ae60',
        width: '80%',
        height: height * 0.06,
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        // shadowColor: "#000",
        // shadowOffset: {width: 10, height: 10 },
        // shadowOpacity: 1,
        // shadowRadius: 16.00,
        // elevation: 12,
    },
    buttonText: {
        padding: 8,
        fontSize: 16,
        color: '#f5f6fa',
        fontWeight: 'bold'
    }

});


export { Button };
