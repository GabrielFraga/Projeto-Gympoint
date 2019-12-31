import React from 'react';

import { Container, Content } from './styles';

export default function Body({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
