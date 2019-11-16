
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


import Tts from 'react-native-tts';

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

    voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: "hey apo how are you",
  };

  constructor(props) {
    super(props);
Tts.addEventListener("tts-start", event =>
          this.setState({ ttsStatus: "started" })
        );
        Tts.addEventListener("tts-finish", event =>
          this.setState({ ttsStatus: "finished" })
        );
        Tts.addEventListener("tts-cancel", event =>
          this.setState({ ttsStatus: "cancelled" })
        );
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
  }

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
    console.log('about to make call')
    api
      .getAllMarkers()
      .then(results => {
        console.log('inside call')
        console.log(results);
        for (let marker of results.data) {
          marker.mentioned = false;
        }
        this.setState({
          markers: results.data,
        });
        console.log(this.state.markers)
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
      api.makeMarker({
        latitude,
        longitude,
        title: this.props.speechRecognitionResults[0]
      })

      this.props.toggleHasSpeechRecorded(false);
    }

    const closeEnoughArr = [];
    if (this.state.markers.length > 0) {
      for (let marker of this.state.markers) {
       const closeEnough = haversine(
            {latitude, longitude},
            {latitude: marker.latitude, longitude: marker.longitude},
            {
              threshold: 0.25,
              unit: 'mile',
            },
          )

        if(closeEnough && marker.mentioned === false) {
          this.readText(marker.title)
          console.log(marker.title)
          marker.mentioned = true
        }
        
    }
    }
    // console.log(closeEnoughArr)
  }






   // -----------------------------------textToVoice-------------------------
   initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return { id: v.id, name: v.name, language: v.language };
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[3].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }


      // for (let voice of voices) {
      //   if(voice.name === "en-us-x-sfg-local"){

      //     console.log("---------------",voice)
      //     console.log(voices.indexOf(voice))
      //   }
      // }
      console.log(voices[103])
      await Tts.setDefaultVoice(voices[103].id);
      this.setState({
        voices: availableVoices,
        selectedVoice,
        ttsStatus: "initialized"
      });
    } else {
      this.setState({ ttsStatus: "initialized" });
    }
  };

  readText = async (title) => {
    Tts.stop();
    Tts.speak(title);
  };

  setSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    this.setState({ speechRate: rate });
  };

  setSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    this.setState({ speechPitch: rate });
  };

  onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    this.setState({ selectedVoice: voice.id });
  };

  renderVoiceItem = ({ item }) => {
    return (
      <Button
        title={`${item.language} - ${item.name || item.id}`}
        color={this.state.selectedVoice === item.id ? undefined : "#969696"}
        onPress={() => this.onVoicePress(item)}
      />
    );
  };

  render() {


    let mapMarkers = null;

    if (this.state.markers.length > 0) {
      mapMarkers = this.state.markers.map(marker => (
        <Marker
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.title}
          description={marker.description}
          onPress={this.readText}

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
      </>
    );
  }
}
export default Map;

