import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, Image, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { changeRegion, fetchBuble } from '../actions';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import addButton from '../images/add_bubble.png';
import exitButton from '../images/exit.png';

const { width, height } = Dimensions.get('window');


class MapScreen extends Component {
  state = {
    region: {
      latitude: 38.963745,
      longitude: 35.243322,
      latitudeDelta: 20.4922,
      longitudeDelta: 20.4421,
    },
    // markers: [{
    //   title: 'hello',
    //   coordinates: {
    //     latitude: 3.148561,
    //     longitude: 101.652778
    //   },
    // },
    // {
    //   title: 'hello',
    //   coordinates: {
    //     latitude: 3.149771,
    //     longitude: 101.655449
    //   },  
    // }]
  }

  componentDidMount() {
    this.props.fetchBuble();
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          clustering={true}
          clusterColor='#000'
          clusterTextColor='#fff'
          clusterBorderColor='#fff'
          // clusterBorderWidth={4}
          region={this.state.region}
        // onRegionChange={this.onRegionChange}
        >

          {this.props.bubbles.map(bubble => {
            console.log('BUBBLE:')
            console.log(bubble.location)
            return (
              <Marker
                key={bubble.uId}
                coordinate={bubble.location}
                title={bubble.title}
                image={require('../images/marker.png')}
                onPress={() => Actions.bubbleDetail({ bubbleTitle: bubble.title })}
              >
              </Marker>
            )
          })}

        </MapView>

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

  console.log(state.mapReducer)
  const bubbles = _.map(state.mapReducer, (bubble, uId) => {
    return { ...bubble, uId }
  });
  console.log(bubbles)
  return { bubbles }
  // const {region} = state.mapReducer
  // return{region}
}


export default connect(mapStateToProps, { changeRegion, fetchBuble })(MapScreen);