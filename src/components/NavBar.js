import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

function NavBar(props) {
  return <View style={[styles.container, props.style]} />;
}

const styles = StyleSheet.create({
  container: {}
});

export default NavBar;
