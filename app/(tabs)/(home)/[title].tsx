//app\(tabs)\(home)\[title]
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TitlePage() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{title: string}>();

  return (
    <View style={styles.container}>
      {title ? (
        <>
          <Text style={styles.title}>Dynamic Page: {title}</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </>
      ) : (
        <Text style={styles.error}>Title parameter is missing.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
