import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { toast } from 'react-toastify';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { formatPrice } from '../../util/format';

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

export default function AddRegistration() {
  const [registration, setRegistration] = useState({
    student: null,
    plan: null,
    start_date: null,
    end_date: null,
    total: null,
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/plans');
      const plan = response.data.plans.map(r => ({
        ...r,
        title: 'plan',
        value: r.id,
        label: r.title,
      }));
      setPlans(plan);
    })();
  }, []);

  useEffect(() => {
    if (registration.plan) {
      const plan = plans
        .filter(p => p.id === registration.plan)
        .map(r => ({
          duration: r.duration,
          price: formatPrice(r.total_price),
        }))[0];
      let end_date = null;

      if (registration.start_date) {
        const startDate = parseISO(registration.start_date);
        end_date = addMonths(startDate, plan.duration);
        end_date = format(end_date, "dd'/'MM'/'yyyy", {
          locale: pt,
        });
      }

      setRegistration(r => ({
        ...r,
        total: plan.price,
        end_date,
      }));
    }
  }, [registration.plan, plans, registration.start_date]);

  async function filterStudent(input) {
    const response = await api.get(`/students`, {
      params: {
        user: input,
      },
    });

    const students = response.data.students.map(s => ({
      title: 'student',
      value: s.id,
      label: s.name,
    }));
    return students;
  }

  const hadleStudent = input =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudent(input));
      }, 1000);
    });

  function handleChange(e) {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  }

  function changeSelectedData(e) {
    setRegistration({ ...registration, [e.title]: e.value });
  }

  async function handleSubmit(e) {
    try {
      const { student, plan, start_date } = registration;
      await api.post('/registrations', {
        student_id: student,
        plan_id: plan,
        start_date: parseISO(start_date),
      });

      toast.success('Plano cadastrado com sucesso');
      history.push('/registrations');
    } catch (error) {
      toast.error('Erro na validação dos dados. Tente novamente');
    }
  }

  return (
    <>
      <Header>
        <h1>Cadastro de matrículas</h1>
        <div>
          <Link to="/registrations">
            <BackButton type="submit">
              <FaChevronLeft size={16} color="#fff" />
              <span>VOLTAR</span>
            </BackButton>
          </Link>
          <ConfirmButton form="addRegistrations" type="submit">
            <FaCheck size={16} color="#fff" onClick={handleSubmit} />
            <span>SALVAR</span>
          </ConfirmButton>
        </div>
      </Header>
      <Container>
        <Form
          id="addRegistrations"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <FirstSection>
            <label>
              ALUNO
              <AsyncSelect
                name="student_id"
                cacheOptions
                placeholder="Buscar aluno"
                defaultOptions
                loadOptions={hadleStudent}
                onChange={changeSelectedData}
              />
            </label>
          </FirstSection>
          <SecondSection>
            <label>
              PLANO
              <Select
                name="plan_id"
                cacheOptions
                placeholder="Selecione um plano"
                onChange={changeSelectedData}
                options={plans}
              />
            </label>
            <label>
              DATA DE INÍCIO
              <Input
                name="start_date"
                type="date"
                placeholder="selecione a data"
                onChange={setRegistration.start_date}
              />
            </label>
            <label>
              DATA DE TÉRMINO
              <Input
                type="text"
                disabled
                name="end_date"
                value={registration.end_date}
              />
            </label>
            <label>
              VALOR FINAL
              <Input
                type="text"
                disabled
                name="total"
                value={registration.total}
              />
            </label>
          </SecondSection>
        </Form>
      </Container>
    </>
  );
}
