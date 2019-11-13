import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

function TalkButton(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Svg viewBox="0 0 136.36 140.37" style={styles.ellipse}>
        <Ellipse
          strokeWidth={34}
          fill="rgba(0,0,0,1)"
          stroke="rgba(10,50,78,1)"
          strokeOpacity={0.56}
          cx={68}
          cy={70}
          rx={51}
          ry={53}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  ellipse: {
    width: 136,
    height: 140
  }
});

export default TalkButton;
