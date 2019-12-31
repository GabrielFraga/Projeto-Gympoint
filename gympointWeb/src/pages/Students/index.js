import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Header, ConfirmButton, Search } from './styles';

import api from '~/services/api';

export default function Students() {
  const [student, setStudent] = useState([]);
  const [searchStudent, setSearchStudent] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const students = await api.get('/students');
      setStudent(students.data.students);
    }
    loadStudents();
  }, []);

  async function handleChange(e) {
    setSearchStudent(e.target.value);

    const name = e.target.value;
    const response = await api.get(`/students`, {
      params: {
        user: name,
      },
    });
    setStudent(response.data.students);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const resp = window.confirm('Deseja realmente remover este aluno?');
    if (resp) {
      try {
        await api.delete(`/students/${id}`);
        toast.success('Usuário removido com sucesso!');
        history.push('/');
      } catch (error) {
        toast.error('Falha na autenticação, verifique os dados eviados!');
      }
    }
  }

  return (
    <>
      <Header>
        <h1>Gerenciamento de alunos</h1>
        <div>
          <Link to="/students/add">
            <ConfirmButton>
              <FaPlus size={16} color="#fff" />
              <span>CADASTRAR</span>
            </ConfirmButton>
          </Link>
          <Search>
            <FaSearch size={16} color="#ccc" />
            <input
              type="text"
              name="user"
              value={searchStudent}
              onChange={handleChange}
              placeholder="Buscar aluno"
            />
          </Search>
        </div>
      </Header>
      <div>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
            </tr>
          </thead>
          <tbody>
            {student.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.age}</td>
                <td>
                  <Link to={`/students/edit/${s.id}`}>editar</Link>
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
      </div>
    </>
  );
}
