import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import api from '../services/api';

export default function WalkScreen() {
  const [route, setRoute] = useState<any[]>([]);
  const [steps, setSteps] = useState(0);
  const [duration, setDuration] = useState(0);
  let locationSubscription: any;

  const startWalk = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Preciso de permissão para acessar sua localização.');
      return;
    }
    setRoute([]);
    setSteps(0);
    // iniciar cronômetro
    const startTime = Date.now();
    locationSubscription = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Highest, timeInterval: 5000 }, loc => {
      setRoute(prev => [...prev, { latitude: loc.coords.latitude, longitude: loc.coords.longitude, timestamp: Date.now() }]);
      setDuration(Math.floor((Date.now() - startTime) / 1000));
    });
    Accelerometer.addListener(data => setSteps(prev => prev + 1));
  };

  const endWalk = async () => {
    locationSubscription && locationSubscription.remove();
    Accelerometer.removeAllListeners();
    try {
      await api.post('/walks', { date: new Date(), duration, route, steps });
      Alert.alert('Sucesso', 'Caminhada registrada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar a caminhada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Duração: {duration}s</Text>
      <Text style={styles.text}>Passos: {steps}</Text>
      <Button title="Iniciar" onPress={startWalk} />
      <Button title="Encerrar" onPress={endWalk} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#e0e0e0', fontSize: 16, margin: 8 }
});