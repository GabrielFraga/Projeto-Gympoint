import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Routes = styled.div`
  display: block;
  width: 100%;

  a {
    font-weight: bold;
    color: #888;
    margin: 0 20px;
  }
`;

export const Content = styled.div`
  height: 58px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    border-right: 1px solid #eee;
    padding-right: 20px;

    img {
      max-width: 40px;
      max-height: 40px;

      margin-right: 10px;
    }

    a {
      font-weight: bold;
      color: #ee4d64;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #777;
    }

    button {
      display: block;
      color: #ee4d64;
      margin-top: 2px;
      font-size: 12px;
      background: none;
    }
  }
`;
