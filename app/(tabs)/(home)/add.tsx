// app/(tabs)/(home)/add.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../../contexts/TaskContext';
import { useThemeColor } from '../../../hooks/useThemeColor';
import FormInput from '../../../components/FormInput';
import { useValidation } from '../../../hooks/useValidation';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { tasks, setTasks } = useTasks();
  const router = useRouter();
  const { errors, validate } = useValidation();

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

  // Handle form submission
  const handleSubmit = () => {
    if (!validate(title, dueDate)) return;

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
      <FormInput
        label="Title *"
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        error={errors.title}
        borderColor={borderColor}
        textColor={textColor}
        errorColor={errorColor}
      />
      <FormInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        borderColor={borderColor}
        textColor={textColor}
      />
      <FormInput
        label="Due Date & Time"
        value={dueDate}
        onChangeText={(text) => setDueDate(formatDateTimeInput(text))}
        placeholder="hh:mm AM/PM MM-DD-YYYY"
        error={errors.dueDate}
        borderColor={borderColor}
        textColor={textColor}
        errorColor={errorColor}
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
