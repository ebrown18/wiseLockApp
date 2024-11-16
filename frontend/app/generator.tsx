import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal } from 'react-native';
import { addPassword } from '@/api'; // Import the addPassword API function
import axios from 'axios'; // Use axios for backend call

export default function Generator() {
  const [label, setLabel] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); // Replace with actual token from user authentication
  const [modalVisible, setModalVisible] = useState(false); // Control visibility of modal
  const [newPassword, setNewPassword] = useState(''); // Store the generated password to show in the modal
  const [newLabel, setNewLabel] = useState(''); // Store the label to show in the modal

  // Generate a random password using the backend
  const generatePassword = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/generate_password/'); // Backend route
      setPassword(response.data.password); // Assume backend returns { "password": "generated_password" }
      
      // Show the password in the modal
      setNewPassword(response.data.password);
      setNewLabel(label); // Set label to display
      setModalVisible(true); // Display modal
    } catch (error) {
      console.error('Error generating password:', error);
      Alert.alert('Error', 'Failed to generate password. Please try again.');
    }
  };

  // Save the password with its label to the backend and update local list
  const handleSavePassword = async () => {
    if (!label || !password) {
      Alert.alert('Error', 'Please enter a label and generate a password.');
      return;
    }
    try {
      // Save the password using API call
      await addPassword(label, password, token);

      // Clear fields after saving
      setLabel('');
      setPassword('');

      Alert.alert('Success', 'Password saved successfully!');
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Generated Password</Text>
            <Text style={styles.modalText}>Label: {newLabel}</Text>
            <Text style={styles.modalText}>Password: {newPassword}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5, width: '100%' },
  password: { fontSize: 18, marginVertical: 20, color: 'blue' },

  // Styles for modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
