// components/Card.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '../hooks/useThemeColor';

interface CardProps {
  id: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ id, title }) => {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Button
        title="Details"
        onPress={() =>
          router.push({ pathname: '/(tabs)/(home)/[id]', params: { id } })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Card;
