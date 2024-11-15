import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPasswords } from '../api';

export default function PassList() {
  const [passwords, setPasswords] = useState<any[]>([]);

  // Fetch passwords from the backend on component mount
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const data = await getPasswords(); // API call to fetch passwords
        setPasswords(data); // Set the fetched passwords to the state
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };
    fetchPasswords();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Passwords</Text>
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id.toString()} // Use the password ID as the key
        renderItem={({ item }) => (
          <Text style={styles.password}>
            {item.label}: {item.value} {/* Display password label and value */}
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
