import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default class LogoHeader extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <TextInput
          placeholder="RЯ"
          placeholderTextColor="rgba(255,255,255,1)"
          style={styles.textInput}
        />
        <View style={styles.rect8} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    opacity: 1
  },
  textInput: {
    width: 45,
    height: 36,
    color: "rgba(255,255,255,1)",
    fontSize: 36
  },
  rect8: {
    backgroundColor: "rgba(5,5,5,1)",
    flex: 1,
    marginBottom: 1,
    marginTop: 2
  }
});
