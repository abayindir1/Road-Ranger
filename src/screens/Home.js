import React, { Component } from "react";
import { StyleSheet, View,Alert, TouchableOpacity } from "react-native";
import Voice from 'react-native-voice';

import { PermissionsAndroid } from 'react-native';
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import LogoHeader from "../components/LogoHeader";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import VoiceTest from '../components/VoiceToText'
import Maps from "../components/Maps"
import TextTest from '../components/TextToVoice'
// import MaterialMapView from "../components/MaterialMapView";
import TalkButton from "../components/TalkButton";
import api from '../../utils/api';

class Home extends Component {


  static navigationOptions = {
    title: 'Home',
  };


  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    hasSpeechRecorded: false,
    // ---------------------------------
    // voices: [],
    //     ttsStatus: "initiliazing",
    //     selectedVoice: null,
    //     speechRate: 0.5,
    //     speechPitch: 1,
    //     text: "hey apo how are you",
  };
  
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.requestAudioPermission()
    // ---------------------------------------------------------
    // Tts.addEventListener("tts-start", event =>
    //       this.setState({ ttsStatus: "started" })
    //     );
    //     Tts.addEventListener("tts-finish", event =>
    //       this.setState({ ttsStatus: "finished" })
    //     );
    //     Tts.addEventListener("tts-cancel", event =>
    //       this.setState({ ttsStatus: "cancelled" })
    //     );
    //     Tts.setDefaultRate(this.state.speechRate);
    //     Tts.setDefaultPitch(this.state.speechPitch);
    //     Tts.getInitStatus().then(this.initTts);
  }

  async requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Voice to text need RecordPermission',
          message:
            'Voice to text needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the microphone');
      } else {
        console.log('Camera permission microphone');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart = e => {
    console.log('SPEAK NOW');
    this.setState({
      started: 'bum',
    });
  };
  onSpeechRecognized = e => {
    console.log('On speech recognized');
    this.setState({
      recognized: 'bum',
    });
  };
  onSpeechError = e => {
    console.log('onSpeechError: ', e, 'speak again please');
    Alert.alert(
      "Please speak again."
    )
    this.setState({
      error: JSON.stringify(e.error),
    });
  };
  onSpeechResults = e => {
    console.log('onSpeechResults: ', e, 'Speech recognition has finished');
    Alert.alert(
      "Speech recognition has finished."
    )
    this.setState({
      results: e.value,
      hasSpeechRecorded: true,
    });
  };
  onSpeechPartialResults = e => {
    console.log('Show them that you are listening', 'onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };
  _startRecognizing = async () => {
    this.setState({
      // recognized: 'anything',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
    try {
      await Voice.start('en_US', {
        "RECOGNIZER_ENGINE": "GOOGLE",
        "EXTRA_PARTIAL_RESULTS": true
      });
      console.log('The speech recognizing function us running')
    } catch (e) {
      console.error(e);
    }
  };
  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
  toggleHasSpeechRecorded = (hasSpeechRecorded) => this.setState({ hasSpeechRecorded })

 


  render() {
    return (
      <View style={styles.container}>
        <Maps toggleHasSpeechRecorded={this.toggleHasSpeechRecorded} hasSpeechRecorded={this.state.hasSpeechRecorded} style={styles.mainMap} speechRecognitionResults={this.state.results} />
        <TouchableOpacity style={styles.button} onPress={() => console.log('yo')} onLongPress={this._startRecognizing}>
          <TalkButton style={styles.talkButton} />
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  mainMap: {
    height: '100%',
    zIndex: -1
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
    opacity: 1,
    borderColor: "#000000",
    borderWidth: 0
  },
  background: {
    top: 0,
    left: 0,
    width: 500,
    height: 812,
    position: "absolute"
  },
  navdisplay: {
    top: 0,
    left: 1,
    width: 375,
    height: 82,
    position: "absolute"
  },
  navBar: {
    top: 0,
    left: 0,
    width: 375,
    height: 82,
    position: "absolute"
  },
  homeButton: {
    top: 38,
    left: 161,
    width: 45,
    height: 44,
    position: "absolute"
  },
  logoHeader: {
    top: 0,
    left: 0,
    width: 45,
    height: 44,
    position: "absolute"
  },
  button2: {
    top: 3,
    left: 1,
    width: 44,
    height: 41,
    position: "absolute"
  },
  logoHeaderStack: {
    width: 45,
    height: 44
  },
  profileButton: {
    top: 41,
    left: 26,
    width: 25,
    height: 25,
    position: "absolute"
  },
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    width: 25,
    height: 25
  },
  button5: {
    top: 0,
    left: 0,
    width: 26,
    height: 27,
    position: "absolute"
  },
  iconStack: {
    width: 26,
    height: 27
  },
  button4: {
    top: 41,
    left: 332,
    width: 20,
    height: 26,
    position: "absolute"
  },
  icon2: {
    top: 0,
    left: 4,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 26
  },
  button3: {
    top: 0,
    left: 0,
    width: 26,
    height: 31,
    position: "absolute"
  },
  icon2Stack: {
    width: 26,
    height: 31,
    marginLeft: -4
  },
  navBarStack: {
    width: 375,
    height: 82
  },
  materialMapView: {
    top: 97,
    left: 1,
    width: 375,
    height: 715,
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    opacity: 1,
    borderColor: "#000000",
    borderWidth: 0,
    borderTopWidth: 5
  },
  button: {
    alignSelf: "center",
    position: 'absolute',
    bottom: "2%"
  },
  testButton: {
    alignSelf: "center",
    position: 'absolute',
    bottom: "20%"
  },
  talkButton: {
    width: 136,
    height: 140
  },
  backgroundStack: {
    width: 376,
    height: 812,
    marginLeft: -1
  }
});

export default Home;