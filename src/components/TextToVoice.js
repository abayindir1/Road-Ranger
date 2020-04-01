import React, { Component } from 'react';
import { StyleSheet, Text, View,Slider, Button, TextInput, Keyboard, FlatList } from 'react-native';
import Tts from 'react-native-tts';

import {PermissionsAndroid} from 'react-native';

class TextTest extends Component {
    state = {
        voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: "example text"
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
    
      readText = async () => {
        Tts.stop();
        Tts.speak(this.state.text);
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
        return (
          <View style={styles.container}>    
            <Button title={`Read text`} onPress={this.readText} />
    
           
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        marginTop: 26,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
      },
      label: {
        textAlign: "center"
      },
      sliderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      },
      sliderLabel: {
        textAlign: "center",
        marginRight: 20
      },
      slider: {
        width: 150
      },
      textInput: {
        borderColor: "gray",
        borderWidth: 1,
        flex: 1,
        width: "100%"
      }
    });







export default TextTest;