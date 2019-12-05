
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

import MapIcon from "react-native-vector-icons/FontAwesome"

// import Voice from 'react-native-voice';

class Map extends React.Component {
  state = {
    currentPosition: {
      latitude: 32.844297,
      longitude: -96.784919,
      latitudeDelta: .1,
      longitudeDelta: .1,
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
    buttonTitles: ['Pothole', 'Accident', 'Speed Trap', 'Road Damage', 'Road Closed', 'Nice View', 'Clean Bathrooms', 'Freshly Paved Road', 'Construction', 'Add Custom Marker'],
    buttonClicked: false,
    currentLatitude: "",
    currentLongitude: ""
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
        console.log("didmount")
        for (let marker of results.data) {
          marker.mentioned = false;
          this.matchToPhotos(marker)
        }
        this.setState({
          markers: results.data,
        });
        // console.log(this.state.markers)
      })
      .catch(err => console.log(err));
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
    //gets the current user coordinates
    const { latitude, longitude } = coordinates;


    this.setState({
      currentPosition: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .1,
        longitudeDelta: .1,
      }
    })


    if (this.props.hasSpeechRecorded) {
      console.log('Make call to send coordinates');
      console.log('in the .then, this.setState({ markers: this.state.markers.concat({ your marker object }) })')
      console.log({ markers: this.state.markers, coordinates, speechRecognitionResults: this.props.speechRecognitionResults[0] })
      this.props.toggleHasSpeechRecorded(false);

      api.makeMarker({
        latitude,
        longitude,
        title: this.props.speechRecognitionResults[0]
      })
      //concat to state and then reset

    }

    //Haversine is a library that calculates distance in the specified unit of measurement between two pairs of latitude/longitude coordinates. Adding a threshold means that the function will return, for each marker, true if that marker is within half a mile of distance, and false if it is not.
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
        //if the marker is within half a mile, the text to voice software reads it out, and then gives the marker a property stating that it has already been mentioned. This guards against repeating the marker multiple times.
        if (closeEnough && marker.mentioned === false) {
          this.readText(marker.title)
          marker.mentioned = true
        }
        //if there is no last reference position, the current position is set to be the last reference position.
      }
      if (!this.state.lastReferencePosition.latitude) {
        this.setState({
          lastReferencePosition: {
            latitude,
            longitude
          }
        })
      } else {

        // This particular haversine threshold didn't work, and had to be done manually
        console.log(this.state.lastReferencePosition)
        let quarterMilePassed = .25 < haversine({ latitude, longitude },
          { latitude: this.state.lastReferencePosition.latitude, longitude: this.state.lastReferencePosition.longitude },
          {
            unit: 'mile',
          })
        if (quarterMilePassed) {
          //If half a mile has passed between the users current position and the last, then set the current position to the last reference position, and get each map marker from the database
          this.setState({
            lastReferencePosition: {
              latitude,
              longitude
            }
          })

          this.getMapMarkers()



        }
      }

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
        if (voice.name === "en-us-x-sfg-local") {

          console.log("---------------", voice)
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
    // Tts.stop();
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
  //this handles any press on the quick-select buttons that show up on the modal
  buttonPressHandler(index) {

    let newState = { ...this.state }

    let button = newState.buttonTitles.find((element, i) => {
      return index === i;
    })

    this.props.toggleModal()

    if (button === "Add Custom Marker") {
      button = this.state.buttonMarkerTest
      console.log(button)
    }


    const buttonTextMarker = { title: button, latitude: newState.currentPosition.latitude, longitude: newState.currentPosition.longitude }

    console.log("a marker was made here at this location. The marker was called" + button)
    api.makeMarker(buttonTextMarker)
      .then(results => {
        this.setState({
          buttonMarkerTest: "",
        })
        console.log("a marker was made")
        console.log("make marker api call result" + results)
        console.log("ther current button marker text is" + this.state.buttonMarkerTest)
      })
      .catch(err => console.log(err))

  }
  //this gets all markers from the database, and is called every half mile, judged by distance of current location from the last reference position.This function can have difficulty if too many markers are placed in a short period of time. This will likely not be a problem, as users will be limited to 3 markers every couple of hours to prevent spam.
  getMapMarkers = async () => {
    api.getAllMarkers()
      .then(newMarkers => {
        console.log("the number of markers in the database is..." + newMarkers.data.length)
        for (let newMarker of newMarkers.data) {
          haversine(
            { latitude: this.state.lastReferencePosition.latitude, longitude: this.state.lastReferencePosition.longitude },
            { latitude: newMarker.latitude, longitude: newMarker.longitude },
            {
              threshold: .25,
              unit: 'mile',
            },
          ) ? newMarker.mentioned = true : newMarker.mentioned = false;
          //if a marker is within half a mile when drawn from the database, it enters as mentioned, as it will have been read off already, or just been created, and so should not be mentioned another time.

          this.matchToPhotos(newMarker)

        }

        this.setState({
          markers: newMarkers.data,
        })

      })
      .catch(err => console.error(err))
  }

  matchToPhotos(aMarker) {
    switch (aMarker.title) {
      case "Pothole":
        aMarker.iconName = "circle"
        break;
      case "Accident":
        aMarker.iconName = "exclamation-triangle"
        break;
      case "Speed Trap":
        aMarker.iconName = "eye"
        break;
      case "Road Damage":
        aMarker.iconName = "road"
        break;
      case "Road Closed":
        aMarker.iconName = "ban"
        break;
      case "Nice View":
        aMarker.iconName = "binoculars"
        break;
      case "Clean Bathrooms":
        aMarker.iconName = "home"
        break;
      case "Freshly Paved Road":
        aMarker.iconName = "forward"
        break;
      case "Construction":
        aMarker.iconName = "wrench"
        break;
      default:
        aMarker.iconName = "star"
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
        // image={}
        >

          <MapIcon name={marker.iconName}  />
          {/* <Image
            source={(marker.imageSrc)}
            style={{ width: 50, height: 50 }}
          /> */}

        </Marker>
      ));
    }

    return (
      <>
        <MapView
          onRegionChange={(data) => console.log(data)}
          showsUserLocation
          zoomEnabled={false}
          scrollEnabled={false}
          //get intial user region
          region={{
            ...this.state.currentPosition,
          }}
          onUserLocationChange={result =>
            this.onUserLocationChange(result.nativeEvent.coordinate)
          }
          style={{ width: '100%', height: "100%" }}>
          {mapMarkers}
        </MapView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>

            <View style={styles.modal}>
              <View>

                {this.state.buttonTitles.map((buttonTitle, index) =>
                  <TouchableHighlight key={index} onPress={(event) => this.buttonPressHandler(index)} title={buttonTitle}>
                    <Text style={styles.markerButtons}>{buttonTitle}</Text>
                  </TouchableHighlight>)}


                <TextInput style={styles.inputBox} placeholder="Enter a custom message" placeholderTextColor="black" value={this.state.buttonMarkerTest} onChangeText={(text) => this.setState({ buttonMarkerTest: text })} />


                <TouchableHighlight
                  onPress={
                    this.props.toggleModal
                  }>
                  <Text style={styles.hideModalButton}>Go Back To Map</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#00000082',
    padding: 30,
    height: 800,
    alignContent: "center",
  },
  markerButtons: {
    color: 'white',
    backgroundColor: "#233f66d4",
    width: "70%",
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    borderRadius: 40,
    margin: 8,
    marginLeft: 50,
    borderBottomWidth: 8,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: '#000000de'
  },
  hideModalButton: {
    color: 'white',
    backgroundColor: "#233f66d4",
    width: "70%",
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    borderRadius: 40,
    margin: 8,
    marginLeft: 50,
    borderBottomWidth: 8,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: '#000000de'
  },
  inputBox: {
    borderBottomColor: "black",
    backgroundColor: "white",
    borderRadius: 10

  }
});
export default Map;

