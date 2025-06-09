import React from 'react';
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';

export default function AppNavigator() {
  return <TabNavigator />; // caso precise de Stack, TabNavigator já abre Stack
}