// app/(tabs)/explore.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Explore</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        Discover new routines, ideas, and inspiration.
      </Text>

      <View style={styles.buttonGroup}>
        <Button title="Trending Tasks" onPress={() => {}} />
        <Button title="Browse Categories" onPress={() => {}} />
        <Button title="Recommended for You" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
});
