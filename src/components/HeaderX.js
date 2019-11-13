import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LogoHeader from "./LogoHeader";

function HeaderX(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.group}>
        <LogoHeader style={styles.logoHeader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  group: {
    width: 45,
    height: 44,
    marginTop: 25,
    marginLeft: 157
  },
  logoHeader: {
    width: 45,
    height: 44
  }
});

export default HeaderX;
