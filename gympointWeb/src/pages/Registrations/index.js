import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FaPlus, FaChevronCircleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Content, Header, ConfirmButton } from './styles';
import history from '~/services/history';

import api from '~/services/api';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loadRegistrations = async () => {
      const response = await api.get('/registrations');

      const registration = await response.data.registrations.map(r => ({
        ...r,
        start_date_formatted: format(
          parseISO(r.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date_formatted: format(
          parseISO(r.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }));

      setRegistrations(registration);
    };
    loadRegistrations();
  });

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const resp = window.confirm('Deseja realmente remover esta matrícula?');
    if (resp) {
      try {
        await api.delete(`/registrations/${id}`);
        toast.success('Matrícula removida com sucesso!');
        history.push('/registrations');
      } catch (error) {
        toast.error('Falha na autenticação, verifique os dados eviados!');
      }
    }
  }

  return (
    <>
      <Header>
        <h1>Gerenciamento de matrículas</h1>
        <Link to="/registrations/add">
          <ConfirmButton>
            <FaPlus size={16} color="#fff" />
            <span>CADASTRAR</span>
          </ConfirmButton>
        </Link>
      </Header>
      <Content>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(r => (
              <tr key={r.id}>
                <td>{r.Student.name}</td>
                <td>{r.Plan.title}</td>
                <td>{r.start_date_formatted}</td>
                <td>{r.end_date_formatted}</td>
                <td>
                  {r.active ? (
                    <FaChevronCircleDown color="green" />
                  ) : (
                    <FaChevronCircleDown color="#ccc" />
                  )}
                </td>
                <td>
                  <Link to={`/registrations/edit/${r.id}`}>editar</Link>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(r.id)}>
                    excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </>
  );
}
