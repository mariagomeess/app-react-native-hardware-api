import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para buscar o endereço usando a API ApiCEP
  const fetchAddress = async () => {
    setLoading(true);
    setError('');
    setAddress(null);
    try {
      const response = await axios.get(`https://cdn.apicep.com/file/apicep/${cep}.json`);
      if (response.data.status !== 200 || !response.data.ok) {
        setError('CEP não encontrado.');
      } else {
        setAddress(response.data);
      }
    } catch (err) {
      setError('Erro ao buscar o endereço.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Endereço por CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />
      <Button title="Buscar" onPress={fetchAddress} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : address ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>CEP: {address.code}</Text>
          <Text style={styles.resultText}>Rua: {address.address}</Text>
          <Text style={styles.resultText}>Bairro: {address.district}</Text>
          <Text style={styles.resultText}>Cidade: {address.city}</Text>
          <Text style={styles.resultText}>Estado: {address.state}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
