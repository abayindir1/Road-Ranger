import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

function GradeBG(props) {
  return (
    <View style={[styles.container, props.style]}>
      <ImageBackground
        style={[
          styles.rect2,
          {
            backgroundColor: props.rect2 || ""
          }
        ]}
        imageStyle={styles.rect2_imageStyle}
        source={require("../assets/images/mapBackGround.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect2: {
    opacity: 1,
    flex: 1
  },
  rect2_imageStyle: {}
});

export default GradeBG;
