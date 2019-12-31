import styled from 'styled-components/native';

export const List = styled.FlatList`
  flex: 1;
`;
export const Item = styled.View`
  flex: 1;
  flex-direction: row;

  background: #fff;
  margin: 5px 0;
  height: 50px;

  justify-content: space-between;
  align-content: center;

  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Text = styled.Text`
  color: #666;
  font-weight: bold;
  font-size: 16px;
`;
export const Created = styled.Text`
  color: #999;
  font-size: 16px;
`;
