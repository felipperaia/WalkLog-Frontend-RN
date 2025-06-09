import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ZombieAvatar from '../components/ZombieAvatar';
import WalkScreen from '../screens/WalkScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#f57f17'
      }}
    >
      <Tab.Screen name="Início" component={HomeScreen} options={{ tabBarIcon: () => <ZombieAvatar /> }} />
      <Tab.Screen name="Caminhar" component={WalkScreen} options={{ tabBarIcon: () => <ZombieAvatar /> }} />
      <Tab.Screen name="Histórico" component={HistoryScreen} options={{ tabBarIcon: () => <ZombieAvatar /> }} />
    </Tab.Navigator>
  );
}