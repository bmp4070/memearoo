import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GalleryProvider } from './src/context/GalleryContext';

export default function App() {
  return (
    <GalleryProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </GalleryProvider>
  );
}
