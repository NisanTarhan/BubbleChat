import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import { Card } from './common';

const { width, height } = Dimensions.get('window');

class BubbleDetail extends Component {

    state = {
        command: ''
    }

    changeCommand = (text) => {
        this.setState({ command: text })
    }

    // renderItem({ item }) {
    //     return (
    //         <View key={item.uid}>
    //             <Card>
    //                 <Text style={styles.tweetStyle}>{item.tweet}</Text>
    //                 <Text style={styles.emailSyle}>{item.email}</Text>
    //             </Card>
    //         </View>
    //     )
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{this.props.bubbleTitle}</Text>

                <View style={{flex: 5, backgroundColor: 'red'}}>

                </View>
                {/* <FlatList
                    style={{width, height: height* 0.60, backgroundColor: 'red'}}
                    data={tweetList}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.uid} /> */}
                <View style={styles.commandView}>
                    <TextInput style={styles.commandBox}
                        value={this.state.command}
                        onChangeText={this.changeCommand}
                        placeholder='Type Here...'
                        maxLength={200} />

                    <TouchableOpacity style={styles.button}>
                        <Text>SEND</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        margin: 20,
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 2,
        padding: 20,
        fontWeight: '500',
        alignSelf: 'center'
    },
    commandBox: {
        flex: 4,
        backgroundColor: '#FFF',
        margin: 10,
    },
    commandStyle: {
        color: '#7B8D93',
        fontSize: 18,
        paddingTop: 2
    },
    emailSyle: {
        color: '#AAB1B4',
        fontSize: 14,
        alignSelf: 'flex-end',
        paddingBottom: 5,
    },
    commandView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
        alignItems: 'center'
    },
    button:{
        flex: 1,
        backgroundColor:'red',
        height: 50,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default BubbleDetail;
