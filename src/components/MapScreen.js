import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, Image, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { changeRegion, fetchBuble } from '../actions';
import ClusteredMapView from 'react-native-maps-super-cluster'
import MapView, { Marker } from 'react-native-maps';
import addButton from '../images/add_bubble.png';
import exitButton from '../images/exit.png';

const { width, height } = Dimensions.get('window');

const CLUSTER_MAX_SIZE = 30

const INIT_REGION = {
  latitude: 38.963745,
  longitude: 35.243322,
  latitudeDelta: 25,
  longitudeDelta: 25,
}

class MapScreen extends Component {
  state = {
    region: {
      latitude: 38.963745,
      longitude: 35.243322,
      latitudeDelta: 20.4922,
      longitudeDelta: 20.4421,
    },
  }

  componentDidMount() {
    this.props.fetchBuble();
  }


  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (bubble) => <Marker key={bubble.uId}
    coordinate={bubble.location}
    //  title={bubble.title}
    image={require('../images/marker.png')}
  //  onPress={() => Actions.bubbleDetail({ bubbleTitle: bubble.title })}
  >
    <MapView.Callout style={{ width: 80, height: 30 }} onPress={() => Actions.bubbleDetail({ bubbleTitle: bubble.title, bubbleId: bubble.uId})}>
      <Text>{bubble.title}</Text>
    </MapView.Callout>
  </Marker>

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ClusteredMapView
          style={{ flex: 1 }}
          data={this.props.bubbles}
          initialRegion={INIT_REGION}
          ref={(r) => { this.map = r }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster} />

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
  },
  myClusterStyle: {
    width: CLUSTER_MAX_SIZE,
    height: CLUSTER_MAX_SIZE,
    backgroundColor: '#3a2ae9',
    borderRadius: CLUSTER_MAX_SIZE / 2,
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myClusterTextStyle: {
    fontSize: 15,
    color: 'white',
  }
})

const mapStateToProps = state => {

  console.log(state.mapReducer)
  const bubbles = _.map(state.mapReducer, (bubble, uId) => {
    return { ...bubble, uId }
  });
  console.log(bubbles)
  return { bubbles }
}


export default connect(mapStateToProps, { changeRegion, fetchBuble })(MapScreen);