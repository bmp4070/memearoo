import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MemeAttemptCard } from '../components/MemeAttemptCard';
import { useGallery } from '../context/GalleryContext';
import { RootStackParamList } from '../navigation/types';

export const GalleryScreen: React.FC = () => {
  const { attempts, deleteAttempt, isLoading } = useGallery();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#A855F7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {attempts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No attempts yet</Text>
          <Text style={styles.emptySubtitle}>Save your first meme match to see it here.</Text>
        </View>
      ) : (
        <FlatList
          data={attempts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MemeAttemptCard
              attempt={item}
              onPress={(attempt) => navigation.navigate('AttemptDetail', { attemptId: attempt.id })}
              onDelete={deleteAttempt}
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1221',
    padding: 16,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyTitle: {
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
