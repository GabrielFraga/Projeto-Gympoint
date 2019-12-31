import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router';

import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Header,
  ConfirmButton,
  BackButton,
  FirstSection,
  SecondSection,
} from './styles';

export default function UpdatePlan() {
  const { id } = useParams();
  const [total, setTotal] = useState([0]);

  const [plan, setPlan] = useState([]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get('/plans', {
        params: {
          id,
        },
      });
      setPlan(response.data.plan);
    }
    loadPlan();
  }, [id]);

  const schema = Yup.object().shape({
    title: Yup.string()
      .required('Esse campo é obrigatório')
      .typeError('Título é obrigatório'),
    duration: Yup.number('Insira uma duração válida')
      .required('Esse campo é obrigatório')
      .typeError('Duração deve ser um número'),
    price: Yup.number('Insira um preço válido')
      .required('Esse campo é obrigatório')
      .typeError('Preço deve ser um número'),
  });

  async function handleSubmit({ title, price, duration }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        price,
        duration,
      });
      toast.success('Plano salvo com sucesso');
      history.push('/plans');
    } catch (error) {
      toast.error('Erro na validação dos dados. Tente novamente');
    }
  }

  useEffect(() => {
    if (plan.price && plan.duration) {
      const totalValue = parseFloat(plan.price) * parseFloat(plan.duration);
      setTotal(totalValue);
    }
  }, [plan.duration, plan.price]);

  function handleChange(e) {
    e.persist();
    setPlan(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <Header>
        <h1>Cadastro de planos</h1>
        <div>
          <Link to="/plans">
            <BackButton type="submit">
              <FaChevronLeft size={16} color="#fff" />
              <span>VOLTAR</span>
            </BackButton>
          </Link>
          <ConfirmButton form="updatePlan" type="submit">
            <FaCheck size={16} color="#fff" onClick={handleSubmit} />
            <span>SALVAR</span>
          </ConfirmButton>
        </div>
      </Header>
      <Container>
        <Form
          id="updatePlan"
          schema={schema}
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <FirstSection>
            <label>
              TÍTULO DO PLANO
              <Input type="text" name="title" value={plan.title} />
            </label>
          </FirstSection>
          <SecondSection>
            <label>
              DURAÇÃO (em meses)
              <Input type="text" name="duration" value={plan.duration} />
            </label>
            <label>
              PREÇO MENSAL
              <Input type="text" name="price" value={plan.price} />
            </label>
            <label>
              PREÇO TOTAL
              <Input type="number" disabled name="total" value={total} />
            </label>
          </SecondSection>
        </Form>
      </Container>
    </>
  );
}
