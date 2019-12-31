import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';
import { Content, ConfirmButton, Header } from './styles';
import history from '~/services/history';

import api from '~/services/api';
import { formatPrice } from '../../util/format';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('/plans');

      const plan = response.data.plans.map(p => ({
        ...p,
        formattedDuration:
          p.duration > 1 ? `${p.duration} meses` : `${p.duration} mês`,
        formattedPrice: formatPrice(p.price),
      }));
      setPlans(plan);
    };
    loadPlans();
  });

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const resp = window.confirm('Deseja realmente remover este plano?');
    if (resp) {
      try {
        await api.delete(`/plans/${id}`);
        toast.success('Plano removido com sucesso!');
        history.push('/plans');
      } catch (error) {
        toast.error('Falha na autenticação, verifique os dados eviados!');
      }
    }
  }
  return (
    <>
      <Header>
        <h1>Gerenciamento de planos</h1>
        <Link to="/plans/add">
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
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(s => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.formattedDuration}</td>
                <td>{s.formattedPrice}</td>
                <td>
                  <Link to={`/plans/edit/${s.id}`}>editar</Link>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(s.id)}>
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
