import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import api from '../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

state = {
  username: "Noobslay3r",
  password: "password123456",
  token: ""
}

componentDidMount() {
  // console.log("muppet")
  api.userLogin(this.state)
  .then(token => {
    console.log(token.data)
    this.setState({token: token.data})
    this.storeData()
    console.log("muppet boogaloo")
    this.retrieveData()
  })
}

storeData = async () => {
  try {
    await AsyncStorage.setItem('userId', this.state.token);
  } catch (error) {
    console.error(error)
  }
};

retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    // console.log(value)
    if (value !== null) {
      // We have data!!
      // console.log("what?")
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

  render() {

    return (

      <View style={styles.root}>
        <View style={styles.Background}>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../assets/images/Gradient_LZGIVfZ.png")}
          >
            <View style={styles.LogoColumn}>
              <View style={styles.Logo}>
                <View style={styles.stackFiller} />
                <View style={styles.rect7Stack}>
                  <View style={styles.rect7} />
                  <TextInput
                    placeholder="RЯ"
                    placeholderTextColor="rgba(255,255,255,1)"
                    underlineColorAndroid="rgba(240,11,11,1)"
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.Form}>
                <View style={styles.UsernameColumn}>
                  <View style={styles.Username}>
                    <EvilIconsIcon name="user" style={styles.icon2} />
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                    // style={styles.UsernameInput}
                    />
                  </View>
                  <View style={styles.Password}>
                    <EvilIconsIcon name="lock" style={styles.icon2} />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                    // style={styles.PasswordInput}
                    />
                  </View>
                </View>
                <View style={styles.UsernameColumnFiller} />
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Channels")}
                  style={styles.button}
                >
                  <Text style={styles.text2}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.LogoColumnFiller} />
            <View style={styles.FooterTexts}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignUp")}
                style={styles.button2}
              >
                <View style={styles.CreateAccountFiller} />
                <Text style={styles.CreateAccount}>Create Account</Text>
              </TouchableOpacity>
              <View style={styles.button2Filler} />
              <Text style={styles.NeedHelp}>Need Help?</Text>
            </View>
          </ImageBackground>
        </View>
        <StatusBar
          animated={false}
          barStyle="light-content"
          hidden={false}
          backgroundColor="rgba(0,0,0,0)"
        />
      </View>
    );

  }



}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    opacity: 1
  },
  Background: {
    opacity: 1,
    shadowOpacity: 1,
    flex: 1,
    marginBottom: -812
  },
  rect: {
    opacity: 1,
    flex: 1
  },
  rect_imageStyle: {},
  Logo: {
    width: 102,
    height: 111,
    shadowOpacity: 1,
    marginLeft: 96
  },
  stackFiller: {
    flex: 1
  },
  rect7: {
    left: 9,
    height: 8,
    backgroundColor: "#25cdec",
    position: "absolute",
    right: 9,
    bottom: 0
  },
  textInput: {
    left: 0,
    width: "100%",
    height: "100%",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    bottom: 8,
    fontSize: 80
  },
  rect7Stack: {
    height: 104,
    marginBottom: 6,
    marginLeft: -7,
    marginRight: -6
  },
  Form: {
    height: 230,
    marginTop: 88
  },
  Username: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  UsernameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  Password: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  PasswordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  UsernameColumn: {},
  UsernameColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  LogoColumn: {
    marginTop: 130,
    marginLeft: 41,
    marginRight: 41
  },
  LogoColumnFiller: {
    flex: 1
  },
  FooterTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  CreateAccountFiller: {
    flex: 1
  },
  CreateAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  NeedHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  }
});

export default Login;
