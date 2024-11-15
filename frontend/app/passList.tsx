import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPasswords } from '../api';

export default function PassList() {
  const [passwords, setPasswords] = useState<any[]>([]);

  useEffect(() => {
    const fetchPasswords = async () => {
        try {
            const data = await getPasswords();
            setPasswords(data);
          } catch (error) {
            console.error('Error fetching passwords:', error);
          }
        };
    fetchPasswords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Passwords</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.password}>
            {item.label}: {item.value}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  password: { fontSize: 16, marginVertical: 5 },
});
