  import React from 'react';
  import { Image } from 'react-native';
  
  export default function ZombieAvatar() {
    return <Image source={require('../../assets/zombie.gif')} style={{ width: 24, height: 24 }} />;
  }