// app/(tabs)/(home)/index.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../../contexts/TaskContext';
import { useThemeColor } from '../../../hooks/useThemeColor';
import Card from '../../../components/Card';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const { tasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const router = useRouter();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');

  useEffect(() => {
    if (!tasks) return;

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredTasks(filtered);
  }, [search, tasks]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>2Y Routine</Text>

      <TextInput
        style={[
          styles.searchBar,
          {
            borderColor,
            color: textColor,
            backgroundColor: backgroundColor === '#151718' ? '#222' : '#fff',
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={borderColor}
        value={search}
        onChangeText={setSearch}
      />

      <Button title="Search" onPress={() => {}} />
      <Button
        title="Add New Task"
        onPress={() => router.push('/(tabs)/(home)/add')}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card id={item.id} title={item.title} dueDate={item.dueDate} />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
