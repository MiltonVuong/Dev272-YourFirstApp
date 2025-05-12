// app/(tabs)/(home)/add.tsx

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '../../../hooks/useThemeColor';
import FormInput from '../../../components/FormInput';
import { useValidation } from '../../../hooks/useValidation';
import { useAddTask } from '../../../hooks/useAddTasks';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const { errors, validate } = useValidation();
  const { mutate: addTask, isPending } = useAddTask();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');
  const errorColor = useThemeColor({ light: 'red', dark: '#ff6b6b' }, 'text');

  const handleSubmit = () => {
    if (!validate(title, '')) return;

    const newTask = {
      title,
      description,
    };

    addTask(newTask, {
      onSuccess: () => router.replace('/(tabs)/(home)/'),
      onError: (err) => console.error('Failed to add task:', err),
    });
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
      <Button title={isPending ? 'Adding...' : 'Add Task'} onPress={handleSubmit} disabled={isPending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
