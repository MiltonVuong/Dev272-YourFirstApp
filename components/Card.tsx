// components/Card.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '../hooks/useThemeColor';

interface CardProps {
  title: string;
  dueDate: string;
}

const Card: React.FC<CardProps> = ({ title, dueDate }) => {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');

  // Extract time portion from dueDate
  let time = '';
  if (dueDate) {
    const parts = dueDate.split(' ');
    if (parts.length >= 2) {
      time = parts[0] + ' ' + parts[1];
    }
  }

  return (
    <View style={[styles.card, { borderColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.dueDate, { color: textColor }]}>{time}</Text>
      </View>
      <Button
        title="Details"
        onPress={() =>
          router.push({ pathname: '/(tabs)/(home)/[title]', params: { title } })
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Card;
