// app/(tabs)/(home)/_layout.tsx

import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="[title]" options={{ title: 'Task Details' }} />
      <Stack.Screen name="add" options={{ title: 'Add Task' }} />
    </Stack>
  );
}
