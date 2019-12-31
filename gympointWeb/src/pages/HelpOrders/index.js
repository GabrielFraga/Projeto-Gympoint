import React, { useEffect, useState } from 'react';

import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import { Container, Content, StyledModal } from './styles';

export default function HelpOrders() {
  const [order, setOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openedOrder, setOpenedOrder] = useState([]);

  useEffect(() => {
    async function loadHelpOrder() {
      const response = await api.get('/students/help-orders');
      setOrder(response.data.order);
    }
    loadHelpOrder();
  }, [openedOrder]);

  function toggleModal(e) {
    setIsOpen(true);
    setOpenedOrder(e);
  }

  async function handleSubmit({ answer }) {
    try {
      const response = await api.post(`/help-orders/${openedOrder.id}/answer`, {
        answer,
      });
      if (response.status === 200) {
        toast.success('Resposta enviada com sucesso');
        setIsOpen(false);
        setOpenedOrder([]);
        history.push('/help-orders');
      }
    } catch (error) {
      toast.error('Erro de validação. Tente novamente');
    }
  }

  return (
    <Container>
      <header />
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
            </tr>
          </thead>
          <tbody>
            {order.map(or => (
              <tr key={or.id}>
                <td>{or.Student.name}</td>
                <td>
                  <button type="button" onClick={() => toggleModal(or)}>
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={() => setIsOpen(false)}
          onEscapeKeydown={() => setIsOpen(false)}
        >
          <Form id="answerStudent" onSubmit={handleSubmit}>
            <h3>PERGUNTA DO ALUNO</h3>

            <span>{openedOrder.question}</span>

            <h3>SUA RESPOSTA</h3>
            <Input multiline name="answer" rows={4} />
            <button type="submit">Responder Aluno</button>
          </Form>
        </StyledModal>
      </Content>
    </Container>
  );
}
