import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../../contexts/TaskContext';
import { useThemeColor } from '../../../hooks/useThemeColor';

export default function App() {
  const [search, setSearch] = useState('');
  const { tasks, setTasks } = useTasks();
  const [filteredData, setFilteredData] = useState(tasks);
  const router = useRouter();

  // Use theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');

  useEffect(() => {
    const filtered = tasks.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
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
      <Button title="Add New Task" onPress={() => router.push('/(tabs)/(home)/add')} />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { borderBottomColor: borderColor }]}>
            <Text style={[styles.item, { color: textColor }]}>{item.title}</Text>
            <Button
              title="Press me"
              onPress={() =>
                router.push({ pathname: '/(tabs)/(home)/[title]', params: { title: item.title } })
              }
            />
          </View>
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 18,
  },
});


