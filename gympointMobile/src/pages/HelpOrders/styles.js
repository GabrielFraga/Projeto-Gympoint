import styled from 'styled-components/native';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
export const Item = styled.View`
  flex: 1;

  background: #fff;
  margin: 5px 0;
  height: 100px;

  align-content: center;

  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Stats = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text`
  flex: 1;
  color: ${props => (props.answer ? '#39b83d' : '#666')};
  font-weight: bold;
  font-size: 16px;
`;

export const Content = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666;
`;

export const Created = styled.Text`
  color: #888;
`;

export const Title = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const Container = styled.View`
  background: #fff;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  justify-content: space-evenly;
`;
export const Question = styled.Text`
  color: #666;
`;
export const OrderContent = styled.Text`
  color: #666;
`;
export const QuestionContainer = styled.View``;
export const AnswerContainer = styled.View`
  padding: 20px 0;
`;
export const QuestionStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
