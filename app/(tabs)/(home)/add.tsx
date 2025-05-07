// app/(tabs)/(home)/add.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../../contexts/TaskContext';
import { useThemeColor } from '../../../hooks/useThemeColor';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  const { tasks, setTasks } = useTasks();
  const router = useRouter();

  // Themed colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');
  const errorColor = useThemeColor({ light: 'red', dark: '#ff6b6b' }, 'text');

  // Format input into hh:mm AM/PM MM-DD-YYYY
  const formatDateTimeInput = (input: string) => {
    const cleaned = input.replace(/[^0-9APMapm]/g, '').toUpperCase();
    let formatted = '';

    if (cleaned.length >= 1) formatted += cleaned.slice(0, 2);
    if (cleaned.length >= 3) formatted += ':' + cleaned.slice(2, 4);
    if (cleaned.length >= 5) formatted += ' ' + cleaned.slice(4, 6);
    if (cleaned.length >= 7) formatted += ' ' + cleaned.slice(6, 8);
    if (cleaned.length >= 9) formatted += '-' + cleaned.slice(8, 10);
    if (cleaned.length >= 11) formatted += '-' + cleaned.slice(10, 14);

    return formatted;
  };

  // Validate form inputs
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';

    const dateTimeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM) (0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
    if (dueDate && !dateTimeRegex.test(dueDate)) {
      newErrors.dueDate = 'Format must be hh:mm AM/PM MM-DD-YYYY';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validate()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
    };

    setTasks([...tasks, newTask]);
    router.replace('/(tabs)/(home)/');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>Title *</Text>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        placeholderTextColor={borderColor}
      />
      {errors.title && <Text style={[styles.errorText, { color: errorColor }]}>{errors.title}</Text>}

      <Text style={[styles.label, { color: textColor }]}>Description</Text>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={borderColor}
      />

      <Text style={[styles.label, { color: textColor }]}>Due Date & Time</Text>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={dueDate}
        onChangeText={(text) => setDueDate(formatDateTimeInput(text))}
        placeholder="hh:mm AM/PM MM-DD-YYYY"
        placeholderTextColor={borderColor}
        maxLength={22}
      />
      {errors.dueDate && <Text style={[styles.errorText, { color: errorColor }]}>{errors.dueDate}</Text>}

      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});



