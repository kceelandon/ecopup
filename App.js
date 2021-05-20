import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, useWindowDimensions,TouchableOpacity } from 'react-native';
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
locationsDB.on('value', (snap) => console.log(snap.val() + ''));

import Marker from 'react-native-maps';
import { TabView, SceneMap } from 'react-native-tab-view';

// Different sustainability tabs
const FirstRoute = () => (
  <View style={styles.scene} >
    <Text >Sustaibability Score 50</Text>
    <Text>Product 10</Text>
    <Text>Wast 10</Text>
    <Text>Community 10</Text>
  </View>
);

const SecondRoute = () => (
  <View style={styles.scene} />
);

const ThirdRoute = () => (
  <View style={styles.scene} />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [height, setHeight] = React.useState(Dimensions.get('window').height);
  const [visible, setVisible]= React.useState(true);
  const layout = useWindowDimensions();
  const half = layout.height/2;
  const [routes] = React.useState([
    { key: 'first', title: 'Sustainability' },
    { key: 'second', title: 'Compare' },
    { key: 'third', title:'Review' },
  ]);

  // list for places to highlight
  var markers = [
    {
      latitude: 47.663,
      longitude: -122.3156,
      title: 'Place 1',
      description: 'Bring straw'
    },

    {
      latitude: 47.6681, 
      longitude: -122.313,
      title: 'Place 2',
      description: 'Bring bag'
    }
  ];


  const initialLayout = { width: Dimensions.get('window').width };

  return (
    <View style={{flex: 1}}> 
      <MapView style={styles.map} 
        initialRegion={{
          latitude: 47.661359844,
          longitude: -122.313174,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,   
        }}>

        {markers.map((marker, index) => (
          <MapView.Marker
            key={index+10}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.title}
            description={marker.description}
          >
          {console.log(marker)}
          </MapView.Marker>
        ))}
      </MapView>
      <TouchableOpacity
        onPress={()=>setVisible.bind(false)}
        title="Learn More"
        style={styles.roundButton1}>
          <Text>Eco</Text>
      </TouchableOpacity>
      { visible && <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={styles.container}
        initialLayout={initialLayout}
        > {console.log(visible)}</TabView>
      }
</View>

  );
}


const styles = StyleSheet.create({
  
  roundButton1: {
    marginTop: 20,
    marginLeft: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#00FF00",
  },
  container: {
    marginTop: Dimensions.get('window').height/2,

  },
  scene:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

  },

  info:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    marginTop: Dimensions.get('window').height/2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: "column",
    position: 'absolute',
    backgroundColor: '#ff4081'
  },
  map: {
    position:"absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});