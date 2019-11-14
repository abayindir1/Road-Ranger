import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import {Marker} from 'react-native-maps';

import haversine from 'haversine';

import api from '../../utils/api';

// import Voice from 'react-native-voice';

class Map extends React.Component {
  state = {
    currentPosition: {
      latitude: 32.844297,
      longitude: -96.784919,
      latitudeDelta: 1,
      longitudeDelta: 1,
    },
    mapUpdateInterval: '',
    markers: [],
    started: '',
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    results: [],
    partialResults: [],
  };



  componentDidMount() {
    console.log('Boogaloo');
    const aMarker = {
      latitude: 32.844297,
      longitude: -96.784919,
      title: 'pothole',
      classification: 'danger',
    };
    const anotherMarker = {
      latitude: 32.86,
      longitude: -96.784919,
      title: 'vista',
      classification: 'chance',
    };

    api
      .getAllMarkers()
      .then(results => {
        // console.log(results);
        this.setState({
          markers: results.data,
        });
      })
      .catch(err => console.log(err));

    // api
    //   .makeMarker(anotherMarker)
    //   .then(newMarker => console.log(newMarker))
    //   .catch(err => console.log(err));
  }

  //requesting location perimission
  async requestFineLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Getting permission to use your location',
          message:
            'Road ranger wants to know your location' +
            'so we can provide you with relevant notifications',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

 

  onUserLocationChange(coordinates) {
    // console.log(coordinates);
    const {latitude, longitude} = coordinates;

    if (this.props.hasSpeechRecorded) {
      console.log('Make call to send coordinates');
      console.log('in the .then, this.setState({ markers: this.state.markers.concat({ your marker object }) })')
      console.log({ markers: this.state.markers, coordinates, speechRecognitionResults: this.props.speechRecognitionResults[0]})
      this.props.toggleHasSpeechRecorded(false);
    }

    const closeEnoughArr = [];
    if (this.state.markers.length > 0) {
      for (let marker of this.state.markers) {
        closeEnoughArr.push(
          haversine(
            {latitude, longitude},
            {latitude: marker.latitude, longitude: marker.longitude},
            {
              threshold: 1,
              unit: 'mile',
            },
          ),
        );
      }
    }
    // console.log(closeEnoughArr)
  }

  render() {


    let mapMarkers = null;

    if (this.state.markers.length > 0) {
      mapMarkers = this.state.markers.map(marker => (
        <Marker
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.title}
          description={marker.description}
          // onPress
        >
          {/* <Image
            source={'./assets/pothole.jpg'}
            style={{width: 50, height: 50}}
          /> */}
        </Marker>
      ));
    } else {
    }

    return (
      <>
        <MapView
          showsUserLocation
          //get intial user region
          region={{
            ...this.state.currentPosition,
          }}
          onUserLocationChange={result =>
            this.onUserLocationChange(result.nativeEvent.coordinate)//-----
          }
          //maps out markers with nested images. Markers can be assigned images by classification
          style={{width: '100%', height: "100%"}}>
          {mapMarkers}
        </MapView>

       
      </>
    );
  }
}
export default Map;

