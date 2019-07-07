import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { changeRegion } from '../actions';
import MapView from 'react-native-maps';
import addButton from '../images/add_bubble.png';
import exitButton from '../images/exit.png';

const { width, height } = Dimensions.get('window');


class MapScreen extends Component {
  // state = {
  //   region: {
  //     latitude: 40.980319,
  //     longitude: 29.062762,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   },
  // }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }
  onRegionChange = (region) => {
    console.log(region)
    this.props.changeRegion(region)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.props.region}
          onRegionChange={this.onRegionChange} />

        <TouchableOpacity style={styles.addButtonStyle} onPress={() => Actions.createBubble()} >
          <Image source={addButton} style={{ height: height * 0.18, width: width * 0.18 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.exitButtonStyle} onPress={() => {
          firebase.auth().signOut()
          Actions.login();
        }} underlayColor='transparent'>
          <Image source={exitButton} style={styles.imageStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButtonStyle: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center'
  },
  exitButtonStyle: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'flex-start',
  },
  imageStyle: {
    width: width * 0.13,
    height: height * 0.13,
    resizeMode: 'contain',
    marginLeft: 5,
  }
})

const mapStateToProps = state => {
  const { region } = state.mapReducer;
  return { region }
}


export default connect(mapStateToProps, { changeRegion })(MapScreen);