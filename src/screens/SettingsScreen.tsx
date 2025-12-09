import React from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

export const SettingsScreen: React.FC = () => {
  const [isAutoScoringEnabled, setAutoScoringEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Memaroo</Text>
        <Text style={styles.subtitle}>Mimic your favorite meme faces and share the laughs.</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Enable auto-scoring</Text>
            <Text style={styles.optionDescription}>Placeholder for future feature.</Text>
          </View>
          <Switch
            value={isAutoScoringEnabled}
            onValueChange={setAutoScoringEnabled}
            thumbColor={isAutoScoringEnabled ? '#A855F7' : undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1221',
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  title: {
    color: '#E5E7EB',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTitle: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
  },
  optionDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
