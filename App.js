import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, useWindowDimensions,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { firebase } from './src/firebase/config'
import Marker from 'react-native-maps';
import { TabView, SceneMap } from 'react-native-tab-view';
import Accord from "./Accord";

// Different sustainability tabs
const FirstRoute = () => (
  <View style={styles.scene} >
    <View style={{flexDirection:"row",marginTop: 20, marginLeft: 20, }}>
    <Text style={styles.titleText}> Sustianability score</Text>
    <TouchableOpacity
        style={styles.circle}>
          <Text>50</Text>
      </TouchableOpacity>
      </View>
    <Accord/>

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
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [visible, setVisible]= useState(false);
  const layout = useWindowDimensions();
  const half = layout.height/2;
  const [routes] = useState([
    { key: 'first', title: 'Sustainability' },
    { key: 'second', title: 'Compare' },
    { key: 'third', title:'Review' },
  ]);
  const [locationData, setLocationData] = useState([]);
  const ref = firebase.database().ref('locations');

  useEffect(() => {
    ref.once('value').then((snapshot) => {
      const newDataList = [];
      snapshot.forEach((childSnap) => {
        console.log(childSnap.key);
        let updatedData = childSnap.val();
        newDataList.push(updatedData);
      });
      setLocationData(newDataList);
    });
  }, [])

  // list for places to highlight. this should now be updated to query from firebase
  // new data is named: locationData
  /*
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
  */

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

        {locationData.map((marker, index) => (
          <MapView.Marker
            key={index+10}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
            description={marker.description + ' Score: ' + marker.score}
          >
          {console.log(marker)}
          </MapView.Marker>
        ))}
      </MapView>
      <TouchableOpacity
        onPress={()=>setVisible(!visible)}
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
    alignItems: 'stretch',

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
  circle: {
    marginLeft: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor:"#FFFF00"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});