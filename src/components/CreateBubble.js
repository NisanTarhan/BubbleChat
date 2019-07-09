import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import { connect } from 'react-redux';
import { changeTitle } from '../actions';
import { Button } from './common';
import { saveBubble, changeLocation } from '../actions';


const { width, height } = Dimensions.get('window');

class CreateBubble extends Component {

    state = {
        locationName : 'Search',
        locationRestriction: {}
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.log(place);
                this.setState({
                    title: '',
                    locationName: place.name,
                    locationRestriction: place.location
                })
                // this.state.changeLocation([place.location.latitude, place.location.longitude])
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    onTitleChanged = (text) => {
        // this.props.changeTitle(text);
        this.setState({title: text})
    }

    saveBubble = () => {
        const { title, locationRestriction } = this.state;
        this.props.saveBubble(title, locationRestriction);
    }

    render() {
        const { loading } = this.props
        return (
            <SafeAreaView style={styles.container}>

                <TouchableOpacity style={styles.searchInput} onPress={() => this.openSearchModal()}>
                    <Text>{this.state.locationName}</Text>
                </TouchableOpacity>

                <TextInput
                    value={this.state.title}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        margin: 8,
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
        backgroundColor: '#fff',
        height: 40,
        width: width * 0.7,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
    }
})

const mapStateToProps = state => {
    console.log(state)
    const { title, loading, location } = state.createReducer;
    return { title, loading, location }
}

export default connect(mapStateToProps, { changeTitle, saveBubble, changeLocation })(CreateBubble);