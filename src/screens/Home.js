import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Text,
  Button,
  StatusBar,
  Image,
} from 'react-native';
// import Voice from 'react-native-voice';

import {PermissionsAndroid} from 'react-native';
import Map from '../components/Map';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Maps from '../components/Maps';
import TextTest from '../components/TextToVoice';
// import MaterialMapView from "../components/MaterialMapView";
import TalkButton from '../components/TalkButton';
import api from '../../utils/api';
import MapIcon from 'react-native-vector-icons/FontAwesome';

const HeaderWithImage = () => (
  <>
    <StatusBar barStyle="light-content" />
    <View style={{height: 64, width: '100%'}}>
      <Image
        style={{height: 64, width: '100%'}}
        source={require('../assets/images/mapBackGround.png')}
      />
      <View
        style={[
          {alignItems: 'center', justifyContent: 'center'},
          StyleSheet.absoluteFill,
        ]}>
        <Image
          style={{position: 'absolute', width: 45, height: 45}}
          source={require('../assets/images/13b8cbed-e1a4-4e8f-b96f-a47346ba2208_200x200.png')}
        />
      </View>
    </View>
  </>
);

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <HeaderWithImage />,
    };
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
  };

  //By tapping the central button, a modal will be displayed. This modal will display all the button options.
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  //the main touchable opacity button will activte voice to text on a long press, and the quick-select buttons modal on a short press.
  render() {
    return (
      <View style={styles.container}>
        <Maps
          toggleModal={() => this.setModalVisible(false)}
          isVisible={this.state.modalVisible}
          style={styles.mainMap}
          speechRecognitionResults={this.state.results}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <TalkButton style={styles.talkButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#00000082',
    padding: 30,
    height: 800,
    alignContent: 'center',
  },
  markerButtons: {
    color: '#bebcbc',
    backgroundColor: 'black',
    width: '70%',
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50,
  },
  markerButtons2: {
    color: 'black',
    backgroundColor: '#bebcbc',
    width: '70%',
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50,
  },
  hideModalButton: {
    color: 'black',
    backgroundColor: 'turquoise',
    width: '70%',
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    borderRadius: 40,
    margin: 10,
    marginLeft: 50,
  },
  mainMap: {
    height: '100%',
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    opacity: 1,
    borderColor: '#000000',
    borderWidth: 0,
  },
  background: {
    top: 0,
    left: 0,
    width: 500,
    height: 812,
    position: 'absolute',
  },
  navdisplay: {
    top: 0,
    left: 1,
    width: 375,
    height: 82,
    position: 'absolute',
  },
  navBar: {
    top: 0,
    left: 0,
    width: 375,
    height: 82,
    position: 'absolute',
  },
  homeButton: {
    top: 38,
    left: 161,
    width: 45,
    height: 44,
    position: 'absolute',
  },
  logoHeader: {
    top: 0,
    left: 0,
    width: 45,
    height: 44,
    position: 'absolute',
  },
  button2: {
    top: 3,
    left: 1,
    width: 44,
    height: 41,
    position: 'absolute',
  },
  logoHeaderStack: {
    width: 45,
    height: 44,
  },
  profileButton: {
    top: 41,
    left: 26,
    width: 25,
    height: 25,
    position: 'absolute',
  },
  icon: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 26,
    width: 25,
    height: 25,
  },
  button5: {
    top: 0,
    left: 0,
    width: 26,
    height: 27,
    position: 'absolute',
  },
  iconStack: {
    width: 26,
    height: 27,
  },
  button4: {
    top: 41,
    left: 332,
    width: 20,
    height: 26,
    position: 'absolute',
  },
  icon2: {
    top: 0,
    left: 4,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 26,
  },
  button3: {
    top: 0,
    left: 0,
    width: 26,
    height: 31,
    position: 'absolute',
  },
  icon2Stack: {
    width: 26,
    height: 31,
    marginLeft: -4,
  },
  navBarStack: {
    width: 375,
    height: 82,
  },
  materialMapView: {
    top: 97,
    left: 1,
    width: 375,
    height: 715,
    backgroundColor: 'rgba(255,255,255,1)',
    position: 'absolute',
    opacity: 1,
    borderColor: '#000000',
    borderWidth: 0,
    borderTopWidth: 5,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '2%',
  },
  testButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '20%',
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
  icon4: {
    color: '#fff',
  },
});

export default Home;
