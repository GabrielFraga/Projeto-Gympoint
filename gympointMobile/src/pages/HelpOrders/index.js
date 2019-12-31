import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { TouchableWithoutFeedback } from 'react-native';

import formatDistance from 'date-fns/formatDistance';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { List, Item, Content, Created, Status, Stats } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const userId = useSelector(state => state.auth.id);

  async function loadHelpOrders(id) {
    const { data } = await api.get(`students/${id}/help-orders`);
    const order = data.order.map(h => ({
      ...h,
      distanceTime: formatDistance(new Date(h.createdAt), new Date(), {
        locale: pt,
      }),
    }));
    setHelpOrders(order);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(userId);
    }
  }, [isFocused, userId]);

  function createHelpOrder() {
    navigation.navigate('CreateHelpOrder');
  }
  function ViewAnswer(item) {
    navigation.navigate('ViewAnswer', {
      item,
    });
  }
  return (
    <Background>
      <Button
        style={{
          marginBottom: 15,
        }}
        onPress={createHelpOrder}>
        Novo pedido de auxílio
      </Button>
      {helpOrders ? (
        <List
          data={helpOrders}
          keyExtractor={help => String(help.id)}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => ViewAnswer(item)}>
              <Item>
                <Stats>
                  <Status answer={item.answer}>
                    <Icon name="check-circle" size={20} />
                    {item.answer ? 'Respondido' : 'Sem Resposta'}{' '}
                  </Status>
                  <Created>{item.distanceTime}</Created>
                </Stats>
                <Content>{item.question}</Content>
              </Item>
            </TouchableWithoutFeedback>
          )}
        />
      ) : (
        false
      )}
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
