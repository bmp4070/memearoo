import React, { useMemo } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGallery } from '../context/GalleryContext';

export type AttemptDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'AttemptDetail'>;

export const AttemptDetailScreen: React.FC<AttemptDetailScreenProps> = ({ route, navigation }) => {
  const { attemptId } = route.params;
  const { attempts, deleteAttempt } = useGallery();

  const attempt = useMemo(() => attempts.find((item) => item.id === attemptId), [attemptId, attempts]);

  if (!attempt) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>Attempt not found.</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = async () => {
    await deleteAttempt(attempt.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{attempt.memeTitle}</Text>
      <View style={styles.row}>
        <Image source={{ uri: attempt.memeImageUri }} style={styles.memeImage} resizeMode="cover" />
        <Image source={{ uri: attempt.imageUri }} style={styles.memeImage} resizeMode="cover" />
      </View>
      <Text style={styles.timestamp}>{new Date(attempt.timestamp).toLocaleString()}</Text>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
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
  title: {
    color: '#E5E7EB',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  memeImage: {
    flex: 1,
    height: 260,
    borderRadius: 14,
  },
  timestamp: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  empty: {
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 40,
  },
});
