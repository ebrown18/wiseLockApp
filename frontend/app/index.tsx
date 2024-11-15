
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Index({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WiseLock!</Text>
      <Text style={styles.text}>Use the navigation below to explore:</Text>
      <Button title="Generate Password" onPress={() => navigation.navigate('PasswordGenerator')} />
      <Button title="View Passwords" onPress={() => navigation.navigate('PasswordList')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});

