import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, useWindowDimensions,TouchableOpacity, ScrollView,Button } from 'react-native';
import MapView from 'react-native-maps';
import { firebase } from './src/firebase/config'
import Marker from 'react-native-maps';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Accord from "./Accord";
import Comparison from "./comparison";


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
  const [currStore, setCurrStore] = useState(0);
  const [currWaste, setCurrWaste] = useState(0);
  const [currProduct, setCurrProduct] = useState(0);
  const [currCommunity, setCurrCommunity] = useState(0);
  const [currWDesc, setCurrWDesc] = useState('');
  const [currPDesc, setCurrPDesc] = useState('');
  const [currCDesc, setCurrCDesc] = useState('');
  const [currCompare, setCurrCompare] = useState([]);
  const blurb = "Our sustainability ratings for stores on the ave are based on these main factors: waste management, sourcing, packaging, money spent on sustainability efforts, and community engagement in terms of sustainability. To quantify these, we reached out to several stores and asked those willing to participate ~15 questions about their sustainability practices. These are the specific factors we considered for each of our 3 score categories.";
  const ref = firebase.database().ref('locations');
  const [currCompareData, setCompareData] = useState(null);



  // Different sustainability tabs
  const FirstRoute = (props) => (
    <View style={styles.scene} >
      {console.log(props)}
      <View style={styles.contents}>
      <Text style={styles.titleText}> Sustianability score</Text>
      <TouchableOpacity
          style={styles.circle}>
            <Text>{props.wasteScore + props.productScore + props.commScore}</Text>
        </TouchableOpacity>
        </View>
      <Accord wScore={props.wasteScore} pScore={props.productScore} cScore={props.commScore} wDesc={props.wasteDesc} pDesc={props.productDesc} cDesc={props.commDesc}/>

    </View>
  );

  const SecondRoute = (props) => (
    <View style={styles.scene}>
    <View style={{flexDirection:"row", marginTop: 10}}> 
      <Text style={styles.titleText}>  {props.storeName}</Text> 
        <TouchableOpacity
          style={styles.circle}>
            <Text>{props.wasteScore + props.productScore + props.commScore}</Text>
        </TouchableOpacity>
        </View> 
        <Text style={styles.subtitleText}>  Other similar shops near by:</Text>
        <View style={{flexDirection:"row", marginTop: 10}}> 
          <Text>{props.compareStoreData[0].name}</Text>  
          <Button title="Compare"
            color='#76A173'
            onPress={() => setCompareData(props.compareStoreData[0])} > 
          </Button>
        </View> 
        <View style={{flexDirection:"row", marginTop: 10}}> 
          <Text>{props.compareStoreData[1].name}</Text>  
          <Button title="Compare"
            color='#76A173'
            onPress={() => setCompareData(props.compareStoreData[1])} >
          </Button>
        </View>
        <Comparison title1={props.storeName} wScore={props.wasteScore} pScore={props.productScore} cScore={props.commScore} compareData={currCompareData}></Comparison>
    </View>
  );

  const ThirdRoute = () => (
    <View style={styles.scene} />
  );

  const FourthRoute = () => (
    <View style={styles.scene} >
    <Text style={styles.paroText}>Our sustainability ratings for stores on the ave are based on these main factors: waste management, sourcing, packaging, money spent on sustainability efforts, and community engagement in terms of sustainability. To quantify these, we reached out to several stores and asked those willing to participate ~15 questions about their sustainability practices. These are the specific factors we considered for each of our 3 score categories.

    Waste: composting, recycling, offering/usage of reusable dishes, choice of plastics, internal waste practices
    
    Product: organic materials usage, vegan options, local options, disposing of local products
    
    Community: sustainability efforts and general engagement in the community
    
    For more general information on sustainability, visit UW Sustainability!
    {"\n"}{"\n"}
    https://green.uw.edu/dashboard/waste {"\n"}
    https://green.uw.edu/dashboard/food
    </Text>
    </View>
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
          return <SecondRoute storeName ={currStore} wasteScore={currWaste} productScore={currProduct} commScore={currCommunity} compareStoreData={currCompare}/>;
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

  const setScores = (store, waste, wasteDesc, product, productDesc, community, communityDesc, compareOne, compareTwo) => {
    // name is for logging purposes only
    setCurrStore(store);
    setCurrWaste(waste);
    setCurrWDesc(wasteDesc);
    setCurrProduct(product);
    setCurrPDesc(productDesc);
    setCurrCommunity(community);
    setCurrCDesc(communityDesc);
    let compareObject = [];
    locationData.forEach((e) => {
      if (e.name === compareOne) {
        compareObject.append(e);
      }
      if (e.name === compareTwo) {
        compareObject.append(e);
      }
    });
    setCurrCompare(compareObject);
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
            onPress={() => setScores(marker.name, marker.waste, marker['waste-desc'], marker.product, marker['product-desc'], marker.community, marker['community-desc'], marker['related-store-one'], marker['related-store-two'])}
          >
          <MapView.Callout onPress={() =>setVisible(!visible) }>
               <Text style={styles.titleText}>{marker.name} &#x1F43E;</Text>
               <Text> {"Remember! Bring reusable bag"}</Text>

               
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
  

  container: {
    marginTop: Dimensions.get('window').height/2,
  },
  scene:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',

  },

  contents:{
    flexDirection:"row",
    marginTop: 20, 
    marginLeft: 20,
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
  subtitleText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  paroText: {
    paddingLeft: 15,
    paddingTop: 15
  },
  paws: {
    fontSize: 20,
  }
});