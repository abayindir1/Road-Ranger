import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import VoiceTest from './src/VoiceToText'
import TextTest from './src/TextToVoice'

const App: () => React$Node = () => {
  return (
    <>
      
      <SafeAreaView>
        <ScrollView>
         <VoiceTest/>
         <TextTest/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
