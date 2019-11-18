import React, { Component } from "react";
import { StyleSheet, View, Image, Header } from "react-native";

function ImageHeader(props) {
    return(
    <View style={{ backgroundColor: '#eee' }}>
      <Image
        style={StyleSheet.absoluteFill}
        source={require("../assets/images/mapBackGround.png")}      />
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
    );
}
  

export default ImageHeader;