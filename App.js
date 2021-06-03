import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, useWindowDimensions,TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { firebase } from './src/firebase/config'
import Marker from 'react-native-maps';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Accord from "./Accord";

export default function App() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible]= useState(false);
  const layout = useWindowDimensions();
  const half = layout.height/2;
  const [routes] = useState([
    { key: 'first', title: 'Eco' },
    { key: 'second', title: 'Compare' },
    { key: 'third', title:'Review' },
    { key: 'fourth', title:'Explain' },
  ]);
  const [locationData, setLocationData] = useState([]);
  const [currWaste, setCurrWaste] = useState(0);
  const [currProduct, setCurrProduct] = useState(0);
  const [currCommunity, setCurrCommunity] = useState(0);
  const [currWDesc, setCurrWDesc] = useState('');
  const [currPDesc, setCurrPDesc] = useState('');
  const [currCDesc, setCurrCDesc] = useState('');
  const ref = firebase.database().ref('locations');



  // Different sustainability tabs
  const FirstRoute = (props) => (
    <View style={styles.scene} >
      {console.log(props)}
      <View style={{flexDirection:"row",marginTop: 20, marginLeft: 20, }}>
      <Text style={styles.titleText}> Sustianability score</Text>
      <TouchableOpacity
          style={styles.circle}>
            <Text>{props.wasteScore + props.productScore + props.commScore}</Text>
        </TouchableOpacity>
        </View>
      <Accord wScore={props.wasteScore} pScore={props.productScore} cScore={props.commScore} wDesc={props.wasteDesc} pDesc={props.productDesc} cDesc={props.commDesc}/>

    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene} />
  );

  const ThirdRoute = () => (
    <View style={styles.scene} />
  );

  const FourthRoute = () => (
    <View style={styles.scene} />
    // put score explaination here info here 
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'green' }}

    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
          return <FirstRoute wasteScore={currWaste} productScore={currProduct} commScore={currCommunity} wasteDesc={currWDesc} productDesc={currPDesc} commDesc={currCDesc}/>;
      case 'second':
          return <SecondRoute/>;
      case 'third':
          return <ThirdRoute/>;
      case 'fourth':
          return <FourthRoute/>;
      default:
          return null;
    }
  };

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

  const setScores = (waste, wasteDesc, product, productDesc, community, communityDesc, name) => {
    // name is for logging purposes only
    setCurrWaste(waste);
    setCurrWDesc(wasteDesc);
    setCurrProduct(product);
    setCurrPDesc(productDesc);
    setCurrCommunity(community);
    setCurrCDesc(communityDesc);

  }

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
            onPress={() => setScores(marker.waste, marker['waste-desc'], marker.product, marker['product-desc'], marker.community, marker['community-desc'], marker.name)}
          >
          <MapView.Callout onPress={() =>setVisible(!visible) }>
               <Text style={styles.titleText}>{marker.name} &#x1F43E;</Text>
               <Text> {"Remember! "}</Text>

               
          </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
      { visible && <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
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
  },
  paws: {
    fontSize: 20,
  }
});