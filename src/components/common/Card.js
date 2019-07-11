import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.cardWrapper}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        height: 60,
        margin: 7,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dddddd',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f5f6fa',
    }
})

export { Card };
