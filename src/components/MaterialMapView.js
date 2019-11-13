import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
// import { MapView } from "expo";
import Maps from "./Maps"

function MaterialMapView(props) {
  return (
    <View style={[styles.container, props.style]}>
      {/* <MapView customMapStyle={"undefined"} style={styles.MapView1} /> */}
      <Maps customMapStyle={"undefined"} style={styles.MapView1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  MapView1: {
    flex: 1,
    backgroundColor: "rgb(230,230,230)"
  }
});

export default MaterialMapView;
