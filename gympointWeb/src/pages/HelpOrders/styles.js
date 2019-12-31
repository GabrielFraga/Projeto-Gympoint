import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { darken } from 'polished';

export const Container = styled.div`
  width: 800px;

  table {
    tr {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const Content = styled.div``;

export const StyledModal = Modal.styled`
  width: 30rem;
  border-radius: 6px;
  background: #fff;
  padding: 20px;

  form{
    display: flex;
    flex-direction: column;
  }

  h3{
    font-weight: bold;
  }

  span{
    margin: 20px 0;
  }

  button {
    margin-top: 20px;;
    background: #ee4d64;
    color: #fff;
    justify-content: center;
    font-weight: bold;
    padding: 11px;
    font-size: 16px;
  
    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }


`;
