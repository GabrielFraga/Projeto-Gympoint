import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert } from 'react-native';

import Input from '~/components/Input';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

export default function HelpOrders({ navigation }) {
  const userId = useSelector(state => state.auth.id);
  const [question, setQuestion] = useState([]);

  async function handleSubmit() {
    try {
      const response = await api.post(`students/${userId}/help-orders`, {
        question,
      });
      console.tron.log(response.data);
      Alert.alert('Pedido enviado com sucesso! Aguarde uma resposta.');
      navigation.navigate('HelpOrders');
    } catch (error) {
      Alert.alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
  }

  return (
    <Background>
      <Input
        placeholder="Inclua seu pedido de auxílio"
        multiline
        numberOfLines={10}
        autoFocus
        style={{
          height: 150,
        }}
        onChangeText={question => setQuestion(question)}
      />
      <Button onPress={handleSubmit}>Enviar pedido</Button>
    </Background>
  );
}
