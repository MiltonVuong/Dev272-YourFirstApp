//app\(tabs)\(home)\index
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../_layout.tsx'; // Corrected import path

export default function App() {
  const [search, setSearch] = useState('');
  const { tasks, setTasks } = useTasks(); // Use context instead of local state
  const [filteredData, setFilteredData] = useState(tasks);
  const router = useRouter();


  useEffect(() => {
    setFilteredData(tasks);
  }, [tasks]);

  const handleSearch = () => {
    const filtered = tasks.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(filtered);
  };

  const handleItemPress = (item) => {
    router.push({
      pathname: '/(tabs)/(home)/[title]',
      params: { title: item.title },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>2Y Routine</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.title}</Text>
            <Button title="Press me" onPress={() => handleItemPress(item)} />
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
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
    borderBottomColor: '#ccc',
  },
  item: {
    fontSize: 18,
  },
});

