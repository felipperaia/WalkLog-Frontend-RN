import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao WalkLog pós-apocalíptico</Text>
      <Button title="Iniciar Caminhada" onPress={() => navigation.navigate('Caminhar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#e0e0e0', fontSize: 18, marginBottom: 20 }
});