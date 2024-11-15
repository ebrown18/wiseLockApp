import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Generator() {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setPassword(randomPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate a Password</Text>
      <Text style={styles.password}>{password || 'Press the button to generate a password'}</Text>
      <Button title="Generate" onPress={generatePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  password: { fontSize: 18, marginVertical: 20, color: 'blue' },
});
