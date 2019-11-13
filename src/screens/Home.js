import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import LogoHeader from "../components/LogoHeader";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import Maps from "../components/Maps"
// import MaterialMapView from "../components/MaterialMapView";
import TalkButton from "../components/TalkButton";

const Home = (props) => {
  return (
    <View style={styles.container}>
      <Maps style={styles.mainMap} />
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("SignUp")} onLongPress={() => props.navigation.navigate("Login")}>
        <TalkButton style={styles.talkButton} />
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  mainMap: {
    height: '100%',
    zIndex: -1
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
    opacity: 1,
    borderColor: "#000000",
    borderWidth: 0
  },
  background: {
    top: 0,
    left: 0,
    width: 500,
    height: 812,
    position: "absolute"
  },
  navdisplay: {
    top: 0,
    left: 1,
    width: 375,
    height: 82,
    position: "absolute"
  },
  navBar: {
    top: 0,
    left: 0,
    width: 375,
    height: 82,
    position: "absolute"
  },
  homeButton: {
    top: 38,
    left: 161,
    width: 45,
    height: 44,
    position: "absolute"
  },
  logoHeader: {
    top: 0,
    left: 0,
    width: 45,
    height: 44,
    position: "absolute"
  },
  button2: {
    top: 3,
    left: 1,
    width: 44,
    height: 41,
    position: "absolute"
  },
  logoHeaderStack: {
    width: 45,
    height: 44
  },
  profileButton: {
    top: 41,
    left: 26,
    width: 25,
    height: 25,
    position: "absolute"
  },
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    width: 25,
    height: 25
  },
  button5: {
    top: 0,
    left: 0,
    width: 26,
    height: 27,
    position: "absolute"
  },
  iconStack: {
    width: 26,
    height: 27
  },
  button4: {
    top: 41,
    left: 332,
    width: 20,
    height: 26,
    position: "absolute"
  },
  icon2: {
    top: 0,
    left: 4,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 26
  },
  button3: {
    top: 0,
    left: 0,
    width: 26,
    height: 31,
    position: "absolute"
  },
  icon2Stack: {
    width: 26,
    height: 31,
    marginLeft: -4
  },
  navBarStack: {
    width: 375,
    height: 82
  },
  materialMapView: {
    top: 97,
    left: 1,
    width: 375,
    height: 715,
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    opacity: 1,
    borderColor: "#000000",
    borderWidth: 0,
    borderTopWidth: 5
  },
  button: {
    alignSelf: "center",
    position: 'absolute',
    bottom: "2%"
  },
  talkButton: {
    width: 136,
    height: 140
  },
  backgroundStack: {
    width: 376,
    height: 812,
    marginLeft: -1
  }
});

export default Home;


    // <View style={styles.container}>
    //   <View style={styles.backgroundStack}>
    //     <Map style={styles.background} />
    //     <View style={styles.navdisplay}>
    //       <View style={styles.navBarStack}>
    //         <NavBar style={styles.navBar} />
    //         <View style={styles.homeButton}>
    //           <View style={styles.logoHeaderStack}>
    //             <LogoHeader style={styles.logoHeader} />
    //             <TouchableOpacity style={styles.button2} />
    //           </View>
    //         </View>
    //         <View style={styles.profileButton}>
    //           <View style={styles.iconStack}>
    //             <MaterialCommunityIconsIcon
    //               name="account-circle"
    //               style={styles.icon}
    //             />
    //             <TouchableOpacity style={styles.button5} />
    //           </View>
    //         </View>
    //         <TouchableOpacity style={styles.button4}>
    //           <View style={styles.icon2Stack}>
    //             <IoniconsIcon name="ios-menu" style={styles.icon2} />
    //             <TouchableOpacity style={styles.button3} />
    //           </View>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <Maps style={styles.materialMapView} />
    //     {/* <MaterialMapView style={styles.materialMapView} /> */}
    //     <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("SignUp")} onLongPress={() => props.navigation.navigate("Login")}>
    //       <TalkButton style={styles.talkButton} />
    //     </TouchableOpacity>
    //   </View>
    // </View>