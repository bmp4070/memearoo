import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MemeCard } from '../components/MemeCard';
import { MEMES } from '../data/memes';
import { RootStackParamList } from '../navigation/types';
import { Meme } from '../types/models';

type HomeScreenNavigation = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigation>();

  const handleSelect = (meme: Meme) => {
    navigation.navigate('MemeChallenge', { meme });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Memaroo</Text>
        <Text style={styles.subtitle}>Pick a meme face to start the challenge</Text>
      </View>
      <FlatList
        data={MEMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <MemeCard meme={item} onPress={handleSelect} />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1221',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  subtitle: {
    color: '#9CA3AF',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  cardWrapper: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 12,
  },
});
