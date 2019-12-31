import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  width: 100%;
  max-width: 315px;
  padding: 30px;
  text-align: center;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;

      &::placeholder {
        color: #3337;
      }
    }

    span {
      color: #fb6f91;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      text-align: center;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
