import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { RootStackParamList } from '../navigation/types';

export type MemeChallengeScreenProps = NativeStackScreenProps<RootStackParamList, 'MemeChallenge'>;

export const MemeChallengeScreen: React.FC<MemeChallengeScreenProps> = ({ route, navigation }) => {
  const { meme } = route.params;
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    if (!permission) {
      void requestPermission();
    }
  }, [permission, requestPermission]);

  const handleCapture = async () => {
    if (!cameraRef.current || permission?.status !== 'granted') {
      return;
    }
    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.6 });
      navigation.navigate('Result', { meme, photoUri: photo.uri });
    } catch (error) {
      console.warn('Failed to capture image', error);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#A855F7" />
      </SafeAreaView>
    );
  }

  if (permission.status !== 'granted') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required to play.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => requestPermission()}>
          <Text style={styles.buttonText}>Enable Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.memeSection}>
        <Image source={{ uri: meme.imageUri }} style={styles.memeImage} resizeMode="contain" />
        <Text style={styles.memeTitle}>{meme.title}</Text>
      </View>
      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={CameraType.front}>
          <Image source={{ uri: meme.imageUri }} style={styles.overlay} resizeMode="contain" />
        </Camera>
      </View>
      <TouchableOpacity style={[styles.primaryButton, isCapturing && styles.disabledButton]} onPress={handleCapture} disabled={isCapturing}>
        <Text style={styles.buttonText}>{isCapturing ? 'Capturing...' : 'Match & Capture'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1221',
    padding: 16,
    gap: 16,
  },
  memeSection: {
    alignItems: 'center',
    gap: 8,
  },
  memeImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  memeTitle: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
    borderRadius: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.25,
  },
  primaryButton: {
    backgroundColor: '#A855F7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  permissionText: {
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
  },
});
