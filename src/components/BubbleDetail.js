import React, { Component } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { saveComment, fetchComment } from '../actions'
import { Card } from './common';
import { colors } from '../style';


const { width, height } = Dimensions.get('window');

class BubbleDetail extends Component {

    state = {
        comment: ''
    }

    componentDidMount() {
        console.log(this.props.bubbleId)
        this.props.fetchComment(this.props.bubbleId)
    }

    changeComment = (text) => {
        this.setState({ comment: text })
    }

    sendComment = () => {
        this.props.saveComment(this.props.bubbleId, this.state.comment)
    }

    renderItem({ item }) {
        return (
            <View key={item.uId}>
                <Card>
                    <Text style={styles.commentStyle}>{item.comment}</Text>
                    <Text style={styles.emailSyle}>{item.email}</Text>
                </Card>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{this.props.bubbleTitle}</Text>

                <FlatList
                    style={{ flex: 1, backgroundColor: '#273c75' }}
                    data={this.props.comments}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.uId} />

                <View style={styles.commentView}>
                    <TextInput style={styles.commentBox}
                        value={this.state.comment}
                        onChangeText={this.changeComment}
                        placeholder='Type Here...'
                        maxLength={200} />

                    <TouchableOpacity style={styles.touchableOpacity} onPress={this.sendComment}>
                        <View style={styles.buttonView}>
                            <Text style={{color: '#ecf0f1', fontWeight: '500',}}>SEND</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.main
    },
    title: {
        margin: 20,
        fontSize: 20,
        borderColor: '#e74c3c',
        backgroundColor: colors.backgroundColor,
        borderRadius: 5,
        color: '#e74c3c',
        borderWidth: 3,
        padding: 20,
        fontWeight: '500',
        alignSelf: 'center'
    },
    commentBox: {
        flex: 4,
        backgroundColor: colors.backgroundColor,
        margin: 10,
        borderRadius: 5
    },
    commentStyle: {
        color: '#7B8D93',
        fontSize: 15,
        paddingTop: 2
    },
    emailSyle: {
        color: '#AAB1B4',
        fontSize: 14,
        alignSelf: 'flex-end',
        paddingBottom: 3
    },
    commentView: {
        height: height * 0.1,
        width,
        flexDirection: 'row',
        backgroundColor: colors.main,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    touchableOpacity: {
        flex: 1,
        backgroundColor: '#2ecc71',
        height: 50,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    buttonView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    console.log(state.commentReducer)
    const comments = _.map(state.commentReducer, (comment, uId) => {
        return { ...comment, uId }
    });
    console.log(comments)
    return { comments }
}

export default connect(mapStateToProps, { saveComment, fetchComment })(BubbleDetail);
