
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
  Modal,
  Alert,
  Button,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import { Marker } from 'react-native-maps';

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
    lastReferencePosition: {
      latitude: "",
      longitude: ""
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
    buttonMarkerTest: "",
    buttonTitles: ['Pothole', 'Accident', 'Speed Trap', 'Road Damage', 'Nice View', 'Road Closed', 'Nice View', 'Clean Bathrooms', 'Freshly Paved Road', 'Custom'],
    buttonClicked: false,
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
    api
      .getAllMarkers()
      .then(results => {
        // console.log(results);
        //find all markers with mentioned equal to true, and check them against the newly imported markers
        //only one marker for every mile distance
        //get markers every mile
        for (let marker of results.data) {
          marker.mentioned = false;
        }
        this.setState({
          markers: results.data,
        });
        // console.log(this.state.markers)
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

  //fired just about every second when the user location changes

  onUserLocationChange(coordinates) {
    // console.log(coordinates);
    const { latitude, longitude } = coordinates;


    if (this.props.hasSpeechRecorded) {
      console.log('Make call to send coordinates');
      console.log('in the .then, this.setState({ markers: this.state.markers.concat({ your marker object }) })')
      console.log({ markers: this.state.markers, coordinates, speechRecognitionResults: this.props.speechRecognitionResults[0] })
      api.makeMarker({
        latitude,
        longitude,
        title: this.props.speechRecognitionResults[0]
      })
//concat to state and then reset
      this.props.toggleHasSpeechRecorded(false);
    }


    console.log(this.state.buttonMarkerTest)
    if (this.state.buttonClicked) {
      const buttonTextMarker = {title: this.state.buttonMarkerTest, latitude, longitude}
      api.makeMarker(buttonTextMarker)

        console.log("bum")
        this.setState({
          buttonMarkerTest: "",
          buttonClicked: false
        })
        console.log(this.state.buttonMarkerTest)

    }


    if (this.state.markers.length > 0) {
      for (let marker of this.state.markers) {
        const closeEnough = haversine(
          { latitude, longitude },
          { latitude: marker.latitude, longitude: marker.longitude },
          {
            threshold: .25,
            unit: 'mile',
          },
        )

        // console.log({[marker.title]: closeEnough})

        if (closeEnough && marker.mentioned === false) {
          this.readText(marker.title)
          // console.log(marker.title)
          // console.log("what's going on?")
          marker.mentioned = true
        }

      }
      // console.log(this.state.lastReferencePosition.latitude)
      if (!this.state.lastReferencePosition.latitude) {
        // console.log("setting reference")
        this.setState({
          lastReferencePosition: {
            latitude,
            longitude
          }
        })
      } else {
        
          //for some reason, this particular haversine threshold didn't work, and had to be done manually, I have literally no idea why
        let quarterMilePassed = .25 < haversine({ latitude, longitude },
          { latitude: this.state.lastReferencePosition.latitude, longitude: this.state.lastReferencePosition.longitude },
          {
            unit: 'mile',
          })

        // console.log(quarterMilePassed)
        if (quarterMilePassed) {
          api.getAllMarkers()
          .then(newMarkers => {

            for (let newMarker of newMarkers.data) {
              haversine(
                { latitude, longitude },
                { latitude: newMarker.latitude, longitude: newMarker.longitude },
                {
                  threshold: .25,
                  unit: 'mile',
                },
              ) ? newMarker.mentioned = true : newMarker.mentioned = false;

            }

            this.setState({
              markers: newMarkers.data,
              lastReferencePosition: {
                latitude,
                longitude
              },
  
  
            })

            // console.log(this.state.markers)

          })
          .catch(err => console.error(err))

        }
      }


      // console.log(closeEnoughArr)
    }
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
        await Tts.setDefaultLanguage(voices[102].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }


      for (let voice of voices) {
        if(voice.name === "en-us-x-sfg-local"){

          console.log("---------------",voice)
          console.log(voices.indexOf(voice))
        }
      }
      console.log(voices[102])
      await Tts.setDefaultVoice(voices[102].id);
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
      // onPress={() => this.onVoicePress(item)}
      />
    );
  };

  buttonPressHandler(index) {

    let newState = {...this.state}  

    // console.log(newState)

    let button = newState.buttonTitles.find((element, i) => {
      return index === i;
    })

    this.props.toggleModal()

    if (button === "Custom") {
      this.setState({buttonClicked: true})
    } else {
      this.setState({buttonMarkerTest: button, buttonClicked: true})
    }






  }

  render() {


    let mapMarkers = null;

    if (this.state.markers.length > 0) {
      mapMarkers = this.state.markers.map(marker => (
        <Marker
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
          // onPress={() => this.readText("boogaloo")}
          key={marker._id}

        >
          {/* <Image
            source={'./assets/pothole.jpg'}
            style={{width: 50, height: 50}}
          /> */}
        </Marker>
      ));
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
          style={{ width: '100%', height: "100%" }}>
          {mapMarkers}
        </MapView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22 }}>
            <View>

              {this.state.buttonTitles.map((buttonTitle, index) => <Button key={index} onPress={(event) => this.buttonPressHandler(index)} title={buttonTitle}/>)}


              <TextInput value={this.state.buttonMarkerTest} onChangeText={(text) => this.setState({buttonMarkerTest: text})} />


              <TouchableHighlight
                onPress={
              this.props.toggleModal
                }>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  modal:{
    backgroundColor: '#00000082',
    padding: 30,
    height: 800,
    alignContent: "center",
  },
  markerButtons:{
    color:'#bebcbc',
    backgroundColor: "black",
    width: "70%",
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50
  },
  markerButtons2:{
    color:'black',
    backgroundColor: "#bebcbc",
    width: "70%",
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50
  },
  hideModalButton:{
    color:'black',
    backgroundColor: "turquoise",
    width: "70%",
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50
  },
});
export default Map;

