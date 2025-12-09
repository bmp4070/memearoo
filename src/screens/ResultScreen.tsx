import React, { useMemo, useState } from 'react';
import { Image, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGallery } from '../context/GalleryContext';

export type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'Result'>;

export const ResultScreen: React.FC<ResultScreenProps> = ({ route, navigation }) => {
  const { meme, photoUri } = route.params;
  const { addAttempt } = useGallery();
  const [isSaving, setIsSaving] = useState(false);

  const sideBySide = useMemo(
    () => (
      <View style={styles.previewRow}>
        <View style={styles.previewCard}>
          <Image source={{ uri: meme.imageUri }} style={styles.previewImage} resizeMode="cover" />
          <Text style={styles.caption}>Original</Text>
        </View>
        <View style={styles.previewCard}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
          <Text style={styles.caption}>Your Match</Text>
        </View>
      </View>
    ),
    [meme.imageUri, photoUri],
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await addAttempt(meme, photoUri);
    } catch (error) {
      console.warn('Failed to save attempt', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({ url: photoUri, message: 'Check out my Memaroo attempt!' });
    } catch (error) {
      console.warn('Share failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{meme.title}</Text>
      {sideBySide}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, isSaving && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Save to Gallery'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={handleShare}>
          <Text style={styles.outlineText}>Share</Text>
        </TouchableOpacity>
      </View>
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
  heading: {
    color: '#E5E7EB',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  previewCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 260,
  },
  caption: {
    color: '#9CA3AF',
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#A855F7',
  },
  secondaryButton: {
    backgroundColor: '#1F2937',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#A855F7',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 16,
  },
  outlineText: {
    color: '#A855F7',
    fontWeight: '700',
    fontSize: 16,
  },
});
