// app/(tabs)/(home)/[id].tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTasks } from '../../../contexts/TaskContext';
import { useThemeColor } from '../../../hooks/useThemeColor';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks } = useTasks();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const errorColor = useThemeColor({ light: 'red', dark: '#ff6b6b' }, 'text');

  const task = tasks.find(t => t.id.toString() === id);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {task ? (
        <>
          <Text style={[styles.title, { color: textColor }]}>{task.title}</Text>

          <Text style={[styles.label, { color: textColor }]}>Description:</Text>
          <Text style={[styles.text, { color: textColor }]}>
            {task.description || 'No description provided.'}
          </Text>

          <Text style={[styles.label, { color: textColor }]}>Due Date:</Text>
          <Text style={[styles.text, { color: textColor }]}>
            {task.dueDate || 'No due date set.'}
          </Text>

          <Button title="Go Back" onPress={() => router.back()} />
        </>
      ) : (
        <Text style={[styles.error, { color: errorColor }]}>Task not found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    fontSize: 18,
  },
});
