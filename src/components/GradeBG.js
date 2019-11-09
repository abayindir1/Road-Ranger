import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

export default class GradeBG extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageBackground
          style={[
            styles.rect2,
            {
              backgroundColor: this.props.rect2 || ""
            }
          ]}
          source={require("../assets/images/Gradient_LZGIVfZ.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  rect2: {
    opacity: 1,
    flex: 1
  }
});
