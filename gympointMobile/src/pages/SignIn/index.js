import React, { useState } from 'react';

import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Background from '../../components/Background';
import { Container, Form } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <Background>
      <Container>
        <Image source={logo} width={90} height={68} />
        <Form>
          <Input
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            autoFocus
            keyboardType="numeric"
            onChangeText={setId}
          />
          <Button loading={loading} onPress={handleSubmit}>
            Entrar
          </Button>
        </Form>
      </Container>
    </Background>
  );
}
