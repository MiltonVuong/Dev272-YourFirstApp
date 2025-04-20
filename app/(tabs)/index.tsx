import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, FlatList, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'Wake up' },
  { id: '2', title: 'Breakfast' },
  { id: '3', title: 'Independent play' },
  { id: '4', title: 'Snack time' },
  { id: '5', title: 'Out door time' },
  { id: '6', title: 'Nap time' },
  { id: '7', title: 'Snack time' },
  { id: '8', title: 'Independent play' },
  { id: '9', title: 'Dinner time' },
  { id: '10', title: 'Sleep time' },
];

export default function () {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = () => {
    const filtered = DATA.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(filtered);
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
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
