import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import logo from '~/assets/logoMenor.svg';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, Routes } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link to="/students">GYMPOINT</Link>
        </nav>
        <Routes>
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/registrations">MATRICULAS</Link>
          <Link to="/help-orders">PEDIDOS DE AUXÍLIO</Link>
        </Routes>
        <aside>
          <Profile>
            <div>
              <strong>Administrador</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
