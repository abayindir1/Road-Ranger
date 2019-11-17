
import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  Nav,
} from 'react-native';
import Voice from 'react-native-voice';
import {PermissionsAndroid} from 'react-native';
import {Header, Button, Left, Right, Body, Icon} from 'native-base';
import Map from '../components/Map';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import VoiceTest from '../components/VoiceToText';
import Maps from '../components/Maps';

// import MaterialMapView from "../components/MaterialMapView";

import TalkButton from '../components/TalkButton';

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
    modalVisible: false,
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
    this.requestAudioPermission();

    

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Voice to text need RecordPermission',
          message: 'Voice to text needs access to your microphone',
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
    console.log(
      'Show them that you are listening',
      'onSpeechPartialResults: ',
      e,
    );
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
        RECOGNIZER_ENGINE: 'GOOGLE',
        EXTRA_PARTIAL_RESULTS: true,
      });
      console.log('The speech recognizing function us running');
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
  toggleHasSpeechRecorded = hasSpeechRecorded =>
    this.setState({hasSpeechRecorded});
  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../assets/images/mapBackGround.png')}>
            <Left>
              <Button transparent>
                <Icon name="menu" />
              </Button>
            </Left>
            {/* <Body style={styles.body}> */}
            <Text style={styles.text}>OЯ</Text>
            {/* </Body> */}
            <Right />
          </ImageBackground>
        </Header>
        <Maps
          toggleHasSpeechRecorded={this.toggleHasSpeechRecorded}
          hasSpeechRecorded={this.state.hasSpeechRecorded}
          style={styles.mainMap}
          speechRecognitionResults={this.state.results}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('yo')}
          onLongPress={this._startRecognizing}>
          <TalkButton style={styles.talkButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.testButton} onPress={() => this.props.navigation.navigate("Login")} onLongPress={() => this.props.navigation.navigate("SignUp")}>

          <TalkButton style={styles.talkButton} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22 }}>
            <View>

              <Button title = 'Pothole'/>
              <Button title = 'Accident'/>
              <Button title = 'Speed Trap'/>
              <Button title = 'Road Damage'/>
              <Button title = 'Road Closed'/>

              <Button title = 'Nice View'/>
              <Button title = 'Clean Bathrooms'/>
              <Button title = 'Freshly Paved Road'/>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainMap: {
    height: '100%',
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    opacity: 1,
    borderColor: '#000000',
    borderWidth: 5,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '2%',
  },
  testButton: {
    alignSelf: "center",
    position: 'absolute',
    bottom: "20%"
  },
  talkButton: {
    width: 136,
    height: 140,
  },
  backgroundStack: {
    width: 376,
    height: 812,
    marginLeft: -1,
  },
  text: {
    flex: 3,
    alignSelf: 'center',
    position: 'absolute',
    width: 45,
    height: 36,
    color: 'rgba(255,255,255,1)',
    fontSize: 50,
  },
  body: {
    flex: 2,
    alignSelf: 'center',
    position: 'absolute',
    width: 100,
    height: 100,
  },
  header: {
    width: 450,
    height: 80,
    marginLeft: -16,
    borderColor: '#000000',
    borderWidth: 1,
  },
  imageBackground: {
    flex: 1,
    width: 450,
    height: 80,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});

export default Home;

