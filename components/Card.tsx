
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Card({ item, onPress }) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.title}</Text>
            <Button title="Press me" onPress={() => onPress(item)} />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
    flexDirection: 'row',
