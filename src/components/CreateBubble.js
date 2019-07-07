import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import { connect } from 'react-redux';
import { changeTitle } from '../actions';
import { Button } from './common';
import { saveBubble } from '../actions';


const { width, height } = Dimensions.get('window');

class CreateBubble extends Component {

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    onTitleChanged = (text) => {
        this.props.changeTitle(text);
    }

    saveBubble = () => {
        const { title, place } = this.props;
        this.props.saveBubble(title);
    }

    render() {
        const { loading } = this.props
        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity style={styles.searchInput} onPress={() => this.openSearchModal()}>
                    <Text>Search</Text>
                </TouchableOpacity>

                <TextInput
                    value={this.props.title}
                    onChangeText={this.onTitleChanged}
                    placeholder='Title'
                    maxLength={25}
                    style={styles.textInput}
                />

                <View style={styles.addButtonView}>
                    <Button spinner={loading} onPress={this.saveBubble}>SAVE</Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        margin: 8,
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
    searchInput: {
        backgroundColor: 'blue',
        height: 40,
        width: width * 0.7
    }
})

const mapStateToProps = state => {
    console.log(state)
    const { title, loading } = state.mapReducer;
    return { title, loading }
}

export default connect(mapStateToProps, { changeTitle, saveBubble })(CreateBubble);