import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;

  background: #f5f5f5;
  box-shadow: 0 0 0 1px #e1e8ef;
`;

export const Content = styled.div`
  header {
    margin-top: 40px;
    justify-content: space-between;

    h1 {
      color: #555;
    }

    > div {
      display: flex;
      justify-content: space-between;

      button {
        margin: 0 10px;
      }
    }

    button {
      font-weight: bold;
      padding: 11px;
    }
  }
  input {
    &::placeholder {
      color: #aaa;

      &[disabled] {
        color: #aaa;
      }
    }
  }
  > div {
    background: #fff;
    margin-top: 25px;
    border-radius: 6px;

    padding: 5px;
    display: flex;
    flex-direction: column;

    form {
      display: flex;
      background: #fff;
      flex-direction: column;

      padding: 40px;

      label {
        font-weight: bold;
        margin-top: 20px;
        color: #555;
      }

      input {
        width: 100%;
        height: 40px;
        border: 1px solid #ccc7;
        border-radius: 4px;

        font-size: 16px;
        padding: 10px;
        color: #444;
      }

      span {
        color: #fb6f91;
        margin: 0 0 10px;
        font-weight: bold;
      }
    }

    table {
      width: 100%;
      text-align: left;

      font-size: 16px;

      td,
      th {
        padding: 20px 60px;
      }

      th {
        color: #555;
      }

      tbody {
        tr {
          border-bottom: 1px solid #ccc;
          margin: 0 10px;

          &:last-of-type {
            border: none;
          }
        }
      }

      td {
        color: #666;

        a {
          color: #7ba4f2;
        }
        button {
          color: #e77575;
          background: none;
          border: none;
          font-size: 16px;
        }
      }
    }
  }
`;
