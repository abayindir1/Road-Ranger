import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import LogoHeader from "./LogoHeader";
import FeatherIcon from "react-native-vector-icons/Feather";

export default class HeaderX extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.group}>
          <View style={styles.iconRow}>
            <MaterialIconsIcon name="dehaze" style={styles.icon} />
            <LogoHeader style={styles.logoHeader} />
          </View>
          <View style={styles.iconRowFiller} />
          <TouchableOpacity /* Conditional navigation not supported at the moment */
            onPress={() => console.log("Navigate to Settings")}
            style={styles.button}
          >
            <FeatherIcon
              name={this.props.icon2Name || "settings"}
              style={styles.icon2}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,178,204,1)"
  },
  group: {
    height: 55,
    backgroundColor: "rgba(31,178,204,1)",
    flexDirection: "row",
    marginTop: 25
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    width: 18,
    height: 25,
    marginTop: 15
  },
  logoHeader: {
    width: 45,
    height: 44,
    marginLeft: 129
  },
  iconRow: {
    height: 44,
    flexDirection: "row",
    marginLeft: 10
  },
  iconRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 15
  },
  icon2: {
    color: "rgba(250,250,250,1)",
    fontSize: 25
  }
});
