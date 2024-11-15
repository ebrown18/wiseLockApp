import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addPassword } from '@/api'; // Import the addPassword API function
import axios from 'axios'; // Use axios for backend call

export default function Generator() {
  const [label, setLabel] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); // Replace with actual token from user authentication

  // Generate a random password using the backend
  const generatePassword = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/generate_password/'); // Update with your backend route
      setPassword(response.data.password); // Assume the backend returns { "password": "generated_password" }
    } catch (error) {
      console.error('Error generating password:', error);
      Alert.alert('Error', 'Failed to generate password. Please try again.');
    }
  };

  // Save the password with its label to the backend
  const handleSavePassword = async () => {
    if (!label || !password) {
      Alert.alert('Error', 'Please enter a label and generate a password.');
      return;
    }
    try {
      await addPassword(label, password, token); // Save the label and password using the API
      Alert.alert('Success', 'Password saved successfully!');
      setLabel(''); // Clear the label input
      setPassword(''); // Clear the generated password
    } catch (error) {
      console.error('Error saving password:', error);
      Alert.alert('Error', 'Failed to save password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate and Save a Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Label"
        value={label}
        onChangeText={setLabel}
      />

      <Text style={styles.password}>
        {password || 'Press the button to generate a password'}
      </Text>

      <Button title="Generate Password" onPress={generatePassword} />
      <Button title="Save Password" onPress={handleSavePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5, width: '100%' },
  password: { fontSize: 18, marginVertical: 20, color: 'blue' },
});

