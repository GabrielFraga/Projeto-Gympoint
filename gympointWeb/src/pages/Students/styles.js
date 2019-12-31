import styled from 'styled-components';
import { darken } from 'polished';

// cor principal #ee4d64

export const Container = styled.div``;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background: none !important;
`;

export const ConfirmButton = styled.button`
  background: #ee4d64;
  color: #fff;

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }

  span {
    margin-left: 10px;
  }
`;
export const BackButton = styled.button`
  background: #ccc;
  color: #fff;

  &:hover {
    background: ${darken(0.03, '#ccc')};
  }

  span {
    margin-left: 10px;
  }
`;

export const Search = styled.form`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  align-items: center;
  padding: 5px;

  input {
    display: block;
    height: 100%;
    margin-left: 15px;
    border: none;
  }
`;

export const Form = styled.form``;

export const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecondSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
