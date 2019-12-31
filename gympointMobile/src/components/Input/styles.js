import styled from 'styled-components/native';
// #ee4e62
export const Container = styled.View`
  height: 46px;
  background: #fff;
  border-radius: 4px;
  margin: 15px 0;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#3337',
})`
  flex: 1;
  font-size: 15px;
  text-align-vertical: top;
  color: #222;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
