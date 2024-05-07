import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const History = () => {
    const navigation = useNavigation();
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        let parsedData;
        try {
          parsedData = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing data:', error);
          return;
        }
        setSavedData(parsedData);
      }
    } catch (e) {
      console.error('Error reading data:', e);
    }
  };

  const clearData = async () => {
    try {
        Alert.alert("Delete", "Are You Sure!", [
            {
              text: "Yes",
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.navigate("DiagnoseScreen");
              },
              style: "cancel",
            },
            {
              text: "No",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
            },
          ]);
    //   await AsyncStorage.clear();
    //   navigation.navigate("DiagnoseScreen");
    } catch (error) {
        Alert.alert("Error", "Please GO BACK", [
            {
              text: "Cancel",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
            },
          ]);
    }
  };
  
  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.heading}>Saved Diseases</Text>
            <TouchableOpacity onPress={clearData}>
                <Ionicons name="trash" size={30}/>
            </TouchableOpacity>
        </View>
      <FlatList
  data={savedData}
  renderItem={({ item }) => (
    <View style={styles.flatlistCont}>
        <Image 
        source={require('../assets/images/disease-1.jpg')}
            style={{
                height:100,
                width:100,
                borderRadius:50,
                marginRight:15
            }}
        />
       
      
      {typeof item.Symptoms === 'string' && typeof item.treatment === 'string' && (
        <View>
            <Text>{item.name}</Text>
          <Text numberOfLines={2}>Symptoms: {item.Symptoms}....</Text>
          <Text numberOfLines={2}>Treatment: {item.treatment}....</Text>
        </View>
        

      )}
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  flatlistCont: {
    margin: 10,
    padding:12,
    backgroundColor: 'red',
    borderRadius: 10,
    flexDirection:'row'
  },
  innerContainer:{
    width:'100%',
    backgroundColor:'#bf9522',
    height:70,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  heading:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000'
  }
});

export default History;
