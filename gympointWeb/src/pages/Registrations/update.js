import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import AsyncSelect from 'react-select/async';
import Select from 'react-select';

import { toast } from 'react-toastify';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router';
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

export default function UpdateRegistration() {
  const { id } = useParams();

  const [registration, setRegistration] = useState({
    student: null,
    user: null,
    plan: null,
    start_date: null,
    end_date: null,
    total: null,
  });
  const [plans, setPlans] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.tron.log(registration);
  }, [registration]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/registrations', {
        params: {
          id,
        },
      });

      setRegistration(() => ({
        student: data.registration[0].student_id,
        user: data.registration[0].Student.name,
        plan: data.registration[0].plan_id,
        start_date: data.registration[0].start_date.slice(0, 10),
      }));
    })();
  }, [id]);

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
    if (registration.plan && plans.length > 0) {
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

    const findstudents = response.data.students.map(s => ({
      title: 'student',
      value: s.id,
      label: s.name,
    }));
    setStudents(findstudents);
    return findstudents;
  }

  const handleStudent = input =>
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
        <h1>Edição de matrícula</h1>
        <div>
          <Link to="/registrations">
            <BackButton type="submit">
              <FaChevronLeft size={16} color="#fff" />
              <span>VOLTAR</span>
            </BackButton>
          </Link>
          <ConfirmButton form="updateRegistrations" type="submit">
            <FaCheck size={16} color="#fff" onClick={handleSubmit} />
            <span>SALVAR</span>
          </ConfirmButton>
        </div>
      </Header>
      <Container>
        <Form
          id="updateRegistrations"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <FirstSection>
            <label>
              ALUNO
              <AsyncSelect
                name="student"
                cacheOptions
                placeholder="Buscar aluno"
                defaultOptions
                value={students.find(s => s.value === registration.student)}
                loadOptions={handleStudent}
                onChange={changeSelectedData}
              />
            </label>
          </FirstSection>
          <SecondSection>
            <label>
              PLANO
              <Select
                name="plan"
                cacheOptions
                placeholder="Selecione um plano"
                value={plans.find(r => r.id === registration.plan)}
                onChange={changeSelectedData}
                hideSelectedOptions
                options={plans}
              />
            </label>
            <label>
              DATA DE INÍCIO
              <Input
                name="start_date"
                type="date"
                placeholder="selecione a data"
                value={registration.start_date}
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
