/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

  // constructor(props) {
  //   super(props);
  //   Voice.onSpeechStart = this.onSpeechStart;
  //   Voice.onSpeechRecognized = this.onSpeechRecognized;
  //   Voice.onSpeechEnd = this.onSpeechEnd;
  //   Voice.onSpeechError = this.onSpeechError;
  //   Voice.onSpeechResults = this.onSpeechResults;
  //   Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  //   Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  //   this.requestAudioPermission();
  // }

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

  // async requestAudioPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       {
  //         title: 'Voice to text need RecordPermission',
  //         message: 'Voice to text needs access to your microphone',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the microphone');
  //     } else {
  //       console.log('Camera permission microphone');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  // componentWillUnmount() {
  //   Voice.destroy().then(Voice.removeAllListeners);
  // }

  // onSpeechStart = e => {
  //   console.log('onSpeechStart: ', e);
  //   this.setState({
  //     started: 'bum',
  //   });
  // };
  // onSpeechRecognized = e => {
  //   console.log('onSpeechRecognized: ', e);
  //   this.setState({
  //     recognized: 'bum',
  //   });
  // };
  // onSpeechError = e => {
  //   console.log('onSpeechError: ', e);
  //   this.setState({
  //     error: JSON.stringify(e.error),
  //   });
  // };
  // onSpeechResults = e => {
  //   console.log('onSpeechResults: ', e);
  //   this.setState({
  //     results: e.value,
  //   });
  // };
  // onSpeechPartialResults = e => {
  //   console.log('onSpeechPartialResults: ', e);
  //   this.setState({
  //     partialResults: e.value,
  //   });
  // };
  // _startRecognizing = async () => {
  //   this.setState({
  //     // recognized: 'anything',
  //     pitch: '',
  //     error: '',
  //     started: '',
  //     results: [],
  //     partialResults: [],
  //     end: '',
  //   });
  //   try {
  //     await Voice.start('en-US');
  //     console.log('bum recognizing');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // _destroyRecognizer = async () => {
  //   try {
  //     await Voice.destroy();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   this.setState({
  //     recognized: '',
  //     pitch: '',
  //     error: '',
  //     started: '',
  //     results: [],
  //     partialResults: [],
  //     end: '',
  //   });
  // };

  onUserLocationChange(coordinates) {
    // console.log(coordinates);
    const {latitude, longitude} = coordinates;

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
    // const styles = StyleSheet.create({
    //   map: {
    //     backgroundColor: 'blue',
    //     color: 'white',
    //     padding: 150,
    //     fontSize: 40,
    //     textAlign: 'center',
    //   },
    //   button: {
    //     fontSize: 30,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: 'blue',
    //     width: 100,
    //     textAlign: 'center',
    //     alignSelf: 'center',
    //   },
    //   result: {
    //     textAlign: 'center',
    //     fontSize: 30,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: 'blue',
    //     width: 150,
    //     alignSelf: 'center',
    //     marginBottom: 10,
    //   },
    //   response: {
    //     fontSize: 24,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: 'blue',
    //     width: 100,
    //     textAlign: 'center',
    //     alignSelf: 'center',
    //   },
    // });

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
            this.onUserLocationChange(result.nativeEvent.coordinate)
          }
          //maps out markers with nested images. Markers can be assigned images by classification
          style={{width: '100%', height: "100%"}}>
          {mapMarkers}
        </MapView>

        {/* <View style={styles.container}>
          <View>
            <Text style={styles.map}>Map </Text>
          </View> */}
        {/* shows results from state */}
        {/* <Text style={styles.result}>Results</Text>
          {this.state.results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.response}>
                {result}
              </Text>
            );
          })} */}
        {/* Speech button */}
        {/* <TouchableHighlight onPress={this._startRecognizing}>
            <Text style={styles.button}>Button</Text>
          </TouchableHighlight>
        </View> */}
      </>
    );
  }
}
export default Map;

// import {} from 'react-native';

// import { PermissionsAndroid } from 'react-native';

// async function requestCameraPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSION.RECORD_AUDIO,
//       {
//         title: 'Voice to text need RecordPermission',
//         message:
//           'Voice to text needs access to your microphone',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the camera');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

// {
//   latlng: {
//     latitude: 32.544297,
//     longitude: -96.784919,
//   },
//   title: 'A map marker',
//   description: 'Electric Boogaloo pt. 1',
//   imageSrc: require('./assets/pothole.jpg'),
// },
// {
//   latlng: {
//     latitude: 32.844297,
//     longitude: -96.784919,
//   },
//   title: 'A map marker',
//   description: 'Electric Boogaloo pt. 2',
//   imageSrc: require('./assets/pothole.jpg'),
// },
// {
//   latlng: {
//     latitude: 32.994297,
//     longitude: -96.784919,
//   },
//   title: 'A map marker',
//   description: 'Electric Boogaloo pt. 3',
//   imageSrc: require('./assets/pothole.jpg'),
// },

// componentDidMount(prevState, currentState) {
//   this.requestFineLocationPermission();

//   if (true) {
//     this.mapWatchId = Geolocation.watchPosition(
//       position => {
//         console.log( "Didupdate", position);
//         this.setState({
//           currentPosition: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           },
//         });
//       },
//       error => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//       },
//       {
//         enableHighAccuracy: true,
//         useSignificantChanges: true,
//         distanceFilter: 0.1,
//       },
//     );
//   }
//   Instead of navigator.geolocation, just use Geolocation.

//   Geolocation.getCurrentPosition(
//     firstPosition => {
//       this.setState({
//         currentPosition: {
//           latitude: firstPosition.coords.latitude,
//           longitude: firstPosition.coords.longitude,
//         },
//       });
//     },
//     error => {
//       console.log(error.code, error.message);
//     },
//     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//   );

//   replace with a status check, and make sure timing is proper
// }

// componentDidUpdate() {

//   const currentLocation = {...this.state.currentPosition};

//   console.warn(
//     `current location state's longitude is ${
//       currentLocation.longitude
//     } and latitiude is ${currentLocation.latitude}`,
//   );

//   let closeEnoughArr = [];

//   console.log("state, current position" + this.state.currentPosition);

//   console.warn("haversine" + closeEnoughArr);
// }

// componentWillUnmount() {
//   clearInterval(this.state.mapUpdateInterval);
// }
