import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzb3EeaoP6U0L-m5j2XVdM0v1s6yjEUDo",
  authDomain: "ecopup-8acb0.firebaseapp.com",
  databaseURL: "https://ecopup-8acb0-default-rtdb.firebaseio.com",
  projectId: "ecopup-8acb0",
  storageBucket: "ecopup-8acb0.appspot.com",
  messagingSenderId: "618393973221",
  appId: "1:618393973221:web:2ad2c6b08a28af8e9dff0c"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const locationsDB = firebase.database().ref('locations/one/score');

export default function App() {
  locationsDB.on('value', (snap) => console.log(snap.val() + ''));
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 47.65541160015467,
        longitude: -122.30354802145196,
        latitudeDelta: 0.3,
        longitudeDelta: 0.4
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
