import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MemeAttempt } from '../types/models';

interface MemeAttemptCardProps {
  attempt: MemeAttempt;
  onPress: (attempt: MemeAttempt) => void;
  onDelete?: (attemptId: string) => void;
}

export const MemeAttemptCard: React.FC<MemeAttemptCardProps> = ({ attempt, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(attempt)}>
      <Image source={{ uri: attempt.imageUri }} style={styles.image} />
      <View style={styles.infoRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{attempt.memeTitle}</Text>
          <Text style={styles.timestamp}>{new Date(attempt.timestamp).toLocaleString()}</Text>
        </View>
        {onDelete && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete(attempt.id);
            }}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
