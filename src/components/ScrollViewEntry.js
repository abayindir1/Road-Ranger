import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

function ScrollViewEntry(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.text2Stack}>
        <Text style={styles.text2}>
          SpaceX goes to Mars: To setup establishment by 2040
        </Text>
        <View style={styles.rect2}>
          <View style={styles.iconRow}>
            <IoniconsIcon name="ios-globe" style={styles.icon} />
            <Text style={styles.text3}>SPACE.com</Text>
            <EvilIconsIcon name="clock" style={styles.icon2} />
            <Text style={styles.text4}>Oct 5, 2019</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text2: {
    top: 0,
    left: 0,
    width: 320,
    height: 56,
    color: "#121212",
    position: "absolute",
    fontSize: 16,
    lineHeight: 20
  },
  rect2: {
    left: 0,
    width: 274,
    position: "absolute",
    bottom: 0,
    height: 20,
    flexDirection: "row"
  },
  icon: {
    color: "grey",
    fontSize: 18
  },
  text3: {
    color: "#121212",
    fontSize: 14,
    marginLeft: 18,
    marginTop: 2
  },
  icon2: {
    color: "grey",
    fontSize: 18,
    marginLeft: 41
  },
  text4: {
    color: "#121212",
    fontSize: 14,
    marginLeft: 22,
    marginTop: 2
  },
  iconRow: {
    height: 18,
    flexDirection: "row",
    flex: 1,
    marginRight: 24,
    marginTop: 1
  },
  text2Stack: {
    width: 320,
    height: 72,
    marginTop: 9,
    marginLeft: 22
  }
});

export default ScrollViewEntry;
