
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
