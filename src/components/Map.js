import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GradeBG from "./GradeBG";

function Map(props) {
  return (
    <View style={[styles.container, props.style]}>
      <GradeBG style={styles.gradeBg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,1)"
  },
  gradeBg: {
    width: 375,
    height: 812
  }
});

export default Map;
