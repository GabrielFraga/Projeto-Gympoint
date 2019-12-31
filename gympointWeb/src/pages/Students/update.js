import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import history from '~/services/history';

import {
  Container,
  Header,
  ConfirmButton,
  BackButton,
  FirstSection,
  SecondSection,
} from './styles';

import api from '~/services/api';

export default function UpdateStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function loadStudent() {
      const response = await api.get('/students', {
        params: {
          id,
        },
      });
      setStudent(response.data.student);
    }
    loadStudent();
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Nome é obrigatório')
      .typeError('Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail é obrigatório'),
    age: Yup.number('Insira uma idade válida')
      .required('Esse campo é obrigatório')
      .typeError('Idade deve ser um número'),
    weight: Yup.number('Insira um peso válido')
      .required('Esse campo é obrigatório')
      .typeError('Peso deve ser um número'),
    height: Yup.number('insira uma altura válida')
      .required('Esse campo é obrigatório')
      .typeError('Altura deve ser um número'),
  });

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.put(`/students/${id}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Aluno salvo com sucesso');
      history.push('/students');
    } catch (error) {
      toast.error('Falha na autenticação, verifique os dados eviados!');
    }
  }

  return (
    <>
      <Header>
        <h1>Edição de aluno</h1>
        <div>
          <Link to="/students">
            <BackButton type="submit">
              <FaChevronLeft size={16} color="#fff" />
              <span>VOLTAR</span>
            </BackButton>
          </Link>
          <ConfirmButton form="addStudent" type="submit">
            <FaCheck size={16} color="#fff" onClick={handleSubmit} />
            <span>SALVAR</span>
          </ConfirmButton>
        </div>
      </Header>
      <Container>
        <Form
          id="addStudent"
          schema={schema}
          onChange={e => setStudent(e.target.value)}
          onSubmit={handleSubmit}
        >
          <FirstSection>
            <label>
              NOME COMPLETO
              <Input
                type="text"
                name="name"
                placeholder="Nome do aluno"
                value={student.name}
              />
            </label>
            <label>
              ENDERECO DE E-MAIL
              <Input
                type="text"
                name="email"
                placeholder=" exemplo@email.com"
                value={student.email}
              />
            </label>
          </FirstSection>
          <SecondSection>
            <label>
              IDADE
              <Input
                type="text"
                name="age"
                placeholder="19"
                value={student.age}
              />
            </label>
            <label>
              PESO (em kg)
              <Input
                type="text"
                name="weight"
                placeholder="65.80"
                value={student.weight}
              />
            </label>
            <label>
              ALTURA
              <Input
                type="text"
                name="height"
                placeholder="1.90"
                value={student.height}
              />
            </label>
          </SecondSection>
        </Form>
      </Container>
    </>
  );
}
