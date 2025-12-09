import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Meme } from '../types/models';

interface MemeCardProps {
  meme: Meme;
  onPress: (meme: Meme) => void;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(meme)}>
      <Image source={{ uri: meme.imageUri }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>{meme.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111827',
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
