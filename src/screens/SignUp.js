import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import api from '../../utils/api';

class SignUp extends Component {

  state = {
    username: "Noobslay3r",
    email: "nhaer123@gmail.com",
    password: "password123456",
  }

  componentDidMount () {
    console.log("gotem")
    // api.userSignup(this.state)
    // .then(res => console.log(res))
    // .catch(err => console.error(err))


  }

  render() {

    return (
      <KeyboardAvoidingView style={styles.root} enabled>
        <View style={styles.BackgroundFiller} />
        <View style={styles.Background}>
          <ImageBackground
            style={styles.rect2}
            imageStyle={styles.rect2_imageStyle}
            source={require("../assets/images/Gradient_LZGIVfZ.png")}
          >
            <View style={styles.ProgressBarColumn}>
              <View style={styles.ProgressBar}>
                <View style={styles.icon2Row}>
                  <IoniconsIcon name="md-checkmark-circle" style={styles.icon2} />
                  <View style={styles.rect4} />
                  <EntypoIcon name="time-slot" style={styles.icon3} />
                  <View style={styles.rect5} />
                </View>
                <View style={styles.icon2RowFiller} />
                <FontAwesomeIcon name="circle" style={styles.icon4} />
              </View>
              <Text style={styles.text3}>CREATE ACCOUNT</Text>
            </View>
            <View style={styles.ProgressBarColumnFiller} />
            <View style={styles.FormColumn}>
              <View style={styles.Form}>
                <View style={styles.NameColumn}>
                  <View style={styles.Name}>
                    <EvilIconsIcon name="user" style={styles.icon5} />
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      value = {this.state.username}
                    // style={styles.NameInput}
                    />
                  </View>
                  <View style={styles.Email}>
                    <EvilIconsIcon name="envelope" style={styles.icon6} />
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      value = {this.state.email}
                    // style={styles.EmailInput}
                    />
                  </View>
                </View>
                <View style={styles.NameColumnFiller} />
                <View style={styles.Password}>
                  <EvilIconsIcon name="lock" style={styles.icon7} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={true}
                    value = {this.state.password}
                  // style={styles.PasswordInput}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Timeline")}
                style={styles.Continue}
              >
                <Text style={styles.text2}>Continue</Text>
              </TouchableOpacity>
              <Text style={styles.text4}>Terms &amp; Conditions</Text>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );

  }


}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(230, 230, 230,1)",
    opacity: 1
  },
  BackgroundFiller: {
    flex: 1
  },
  Background: {
    backgroundColor: "rgba(0,0,0,1)",
    height: 812
  },
  rect2: {
    opacity: 1,
    flex: 1
  },
  rect2_imageStyle: {},
  ProgressBar: {
    height: 40,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(30,174,199,1)",
    fontSize: 40,
    width: 33,
    height: 40
  },
  rect4: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(31,178,204,1)",
    opacity: 1,
    borderRadius: 40,
    marginLeft: 8,
    marginTop: 16
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 35,
    width: 40,
    height: 36,
    marginLeft: 8,
    marginTop: 4
  },
  rect5: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(230, 230, 230,1)",
    opacity: 0.75,
    borderRadius: 40,
    marginLeft: 3,
    marginTop: 16
  },
  icon2Row: {
    height: 40,
    flexDirection: "row"
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    width: 34,
    height: 40,
    opacity: 0.75
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 62,
    alignSelf: "center"
  },
  ProgressBarColumn: {
    marginTop: 58,
    marginLeft: 69,
    marginRight: 69
  },
  ProgressBarColumnFiller: {
    flex: 1
  },
  Form: {
    height: 230,
    marginBottom: 95
  },
  Name: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 16,
    alignSelf: "center"
  },
  NameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 12,
    marginTop: 14
  },
  Email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  EmailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  NameColumn: {},
  NameColumnFiller: {
    flex: 1
  },
  Password: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  PasswordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  Continue: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    opacity: 1,
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 60
  },
  text2: {
    width: 66,
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center"
  },
  FormColumn: {
    marginBottom: 31,
    marginLeft: 41,
    marginRight: 41
  }
});

export default SignUp;
