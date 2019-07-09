import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { changeRegion, fetchBuble } from '../actions';
import MapView from 'react-native-maps';
import addButton from '../images/add_bubble.png';
import exitButton from '../images/exit.png';

const { width, height } = Dimensions.get('window');


class MapScreen extends Component {

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
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

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  // componentWillMount() {
  //   if(this.props.data == undefined){ 
  //     this.setState({
  //       region:{
  //         latitude: 41.0082376,
  //         longitude: 28.9783589,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }
  //     })
  //   }else{
  //     console.log('CreateBubbledan gelen: ' )
  //     console.log(this.props.data.location)
  //     const {latitude, longitude} = this.props.data.location;
  //     this.setState({
  //       region:{
  //         latitude: latitude,
  //         longitude: longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }
  //     })
  //   }   
  // }

  componentDidMount() {
    this.props.fetchBuble();
  }

  // onRegionChange = (region) => {
  //   console.log(region)
  //   this.props.changeRegion(region)
  // }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
        // region={this.state.region}
        // onRegionChange={this.onRegionChange}
        >

          {/* {this.props.bubbles.map(bubble => (
            <MapView.Marker
              key={bubble.uId}
              coordinate={bubble.location}
              title={bubble.title}
              description="Açıklama"
            />
          ))}  */}

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