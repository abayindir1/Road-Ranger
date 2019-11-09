import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import Voice from 'react-native-voice';

import {PermissionsAndroid} from 'react-native';

class VoiceTest extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
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
    console.log('onSpeechStart: ', e);
    this.setState({
      started: 'bum',
    });
  };
  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: 'bum',
    });
  };
  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };
  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };
  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
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
      await Voice.start('es_US', {
        "RECOGNIZER_ENGINE": "GOOGLE",
         "EXTRA_PARTIAL_RESULTS": true
      });
      console.log("bum recognizing")
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
  
  render() {
    return (
      <View style={styles.container}>

      {/* shows results from state */}
        <Text style={styles.result}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.response}>
              {result}
            </Text>
          );
        })}

      {/* Speech button */}
        <TouchableHighlight onPress={this._startRecognizing}>
          <Text style={styles.button}>Button</Text>
        </TouchableHighlight>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  map:{
    backgroundColor: "blue",
    color: "white",
    padding:150,
    fontSize: 40,
    textAlign:"center"
  },
  button:{
    fontSize:30,
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'blue',
    width:100,
    textAlign:"center",
    alignSelf: "center"
  },
  result:{
    textAlign:"center",
    fontSize: 30,
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'blue',
    width:150,
    alignSelf: "center",
    marginBottom: 10,
  },
  response:{
    fontSize:24,
    borderRadius:4,
    borderWidth: 1,
    borderColor: 'blue',
    width:150,
    textAlign:"center",
    alignSelf: "center"
  }
});
export default VoiceTest;