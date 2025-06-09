import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default function HistoryScreen({ navigation }) {
  const [walks, setWalks] = useState<Array<any>>([]);

  useEffect(() => {
    api.get('/walks').then((res) => setWalks(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={walks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { id: item._id })}>
            <Text style={styles.item}>{new Date(item.date).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  item: { color: '#e0e0e0', padding: 12, borderBottomColor: '#424242', borderBottomWidth: 1 }
});