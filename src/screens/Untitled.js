import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import HeaderX from "../components/HeaderX";
import GradeBG from "../components/GradeBG";

export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerXStack}>
          <HeaderX style={styles.headerX} />
          <GradeBG style={styles.gradeBg} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerX: {
    top: 0,
    left: 0,
    width: 375,
    height: 80,
    position: "absolute"
  },
  gradeBg: {
    top: 80,
    left: 0,
    width: 375,
    height: 732,
    backgroundColor: "rgba(0,0,0,1)",
    position: "absolute",
    opacity: 1,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)"
  },
  headerXStack: {
    width: 375,
    height: 812
  }
});
