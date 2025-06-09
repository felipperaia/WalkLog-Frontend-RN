import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import api from '../services/api';

export default function DetailsScreen({ route }: any) {
  const { id } = route.params;
  const [walk, setWalk] = useState<any>(null);

  useEffect(() => {
    api.get(`/walks/${id}`).then((res: any) => setWalk(res.data));
  }, []);

  if (!walk) return <Text style={{ color: '#e0e0e0' }}>Carregando...</Text>;

  interface RoutePoint {
    latitude: number;
    longitude: number;
  }

  interface Walk {
    duration: number;
    steps: number;
    route: RoutePoint[];
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (walk as Walk).route[0].latitude,
          longitude: (walk as Walk).route[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={(walk as Walk).route.map((p: RoutePoint) => ({
            latitude: p.latitude,
            longitude: p.longitude,
          }))}
        />
      </MapView>
      <Text style={styles.info}>Duração: {(walk as Walk).duration}s</Text>
      <Text style={styles.info}>Passos: {(walk as Walk).steps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { flex: 1 },
  info: { color: '#e0e0e0', padding: 8 }
});