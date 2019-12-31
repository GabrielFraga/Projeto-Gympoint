import React from 'react';
import { View } from 'react-native';
import Background from '~/components/Background';
import api from '~/services/api';

import {
  Title,
  Created,
  Container,
  QuestionContainer,
  QuestionStatus,
  Question,
  AnswerContainer,
  OrderContent,
} from './styles';

export default function HelpOrders({ navigation }) {
  const helpOrder = navigation.getParam('item');

  return (
    <Background>
      <Container>
        <QuestionContainer>
          <QuestionStatus>
            <Title>PERGUNTA</Title>
            <Created>{helpOrder.distanceTime}</Created>
          </QuestionStatus>
          <Question>{helpOrder.question}</Question>
        </QuestionContainer>
        <AnswerContainer>
          <Title>RESPOSTA</Title>
          <OrderContent>{helpOrder.answer}</OrderContent>
        </AnswerContainer>
      </Container>
    </Background>
  );
}
