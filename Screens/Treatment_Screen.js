// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// const TreatmentScreen = () => {
//   const [searchText, setSearchText] = useState('');
//   const [treatments, setTreatments] = useState({});
//   const [searchResult, setSearchResult] = useState('');

//   useEffect(() => {
//     const saveCSVToDocumentDirectory = async () => {
//       try {
//         const fileUri = FileSystem.documentDirectory + './treatment-book.csv';
//         const { exists } = await FileSystem.getInfoAsync(fileUri);
//         if (!exists) {
//           const csvUri = require('./treatment-book.csv'); // Adjust the path to your CSV file
//           await FileSystem.copyAsync({ from: csvUri, to: fileUri });
//           console.log('CSV file copied to document directory');
//         }
//       } catch (error) {
//         console.error('Error saving CSV file to document directory:', error);
//       }
//     };
//     saveCSVToDocumentDirectory();
//   }, []);

//   useEffect(() => {
//     const loadCSVData = async () => {
//       try {
//         const fileUri = FileSystem.documentDirectory + 'treatment-book.csv';
//         const { exists } = await FileSystem.getInfoAsync(fileUri);
//         if (exists) {
//           const csvString = await FileSystem.readAsStringAsync(fileUri);
//           const rows = csvString.split('\n');
          
//           // Parse header row to get column names
//           const headers = rows[0].split(',');
//           const diseaseNameIndex = headers.indexOf('disease_name');
//           const treatmentIndex = headers.indexOf('treatment');
          
//           const data = {};
//           // Start from index 1 to skip the header row
//           for (let i = 1; i < rows.length; i++) {
//             const row = rows[i].split(',');
//             const diseaseName = row[diseaseNameIndex].trim();
//             const treatment = row[treatmentIndex].trim();
//             data[diseaseName] = treatment;
//           }
//           setTreatments(data);
//         } else {
//           console.log('CSV file does not exist');
//         }
//       } catch (error) {
//         console.error('Error loading CSV data:', error);
//       }
//     };
//     loadCSVData();
//   }, []);

//   const handleSearch = () => {
//     const treatment = treatments[searchText.trim()];
//     if (treatment) {
//       setSearchResult(treatment);
//     } else {
//       setSearchResult('Treatment not found');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <TextInput
//         style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
//         placeholder="Enter disease name"
//         value={searchText}
//         onChangeText={text => setSearchText(text)}
//       />
//       <TouchableOpacity
//         style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
//         onPress={handleSearch}
//       >
//         <Text style={{ color: 'white' }}>Search</Text>
//       </TouchableOpacity>
//       <Text style={{ marginTop: 20 }}>{searchResult}</Text>
//     </View>
//   );
// };

// export default TreatmentScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const TreatmentScreen = () => {
  const [diseaseName, setDiseaseName] = useState('');
  const [treatment, setTreatment] = useState('');

  const extractTreatment = () => {
    try {
      const diseases = require('../assets/treatment.json');

      const foundDisease = diseases.find(disease => disease.disease_name === diseaseName);
      if (foundDisease) {
        setTreatment(foundDisease.treatment);
      } else {
        Alert.alert('Error', 'Disease not found.');
      }
    } catch (error) {
      console.error('Error reading JSON file:', error);
      Alert.alert('Error', 'Failed to read JSON file.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 5, width: 200 }}
        placeholder="Enter disease name"
        onChangeText={text => setDiseaseName(text)}
        value={diseaseName}
      />
      <Button title="Extract Treatment" onPress={extractTreatment} />
      {treatment ? (
        <View style={{ marginTop: 20 }}>
          <Text>Treatment:</Text>
          <Text>{treatment}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TreatmentScreen;
