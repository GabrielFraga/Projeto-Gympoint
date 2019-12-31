import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert, ActivityIndicator } from 'react-native';

import formatDistance from 'date-fns/formatDistance';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { List, Item, Text, Created } from './styles';

function CheckIns({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const [render, setRender] = useState([]);
  const [loading, setLoading] = useState([false]);

  const userId = useSelector(state => state.auth.id);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`students/${userId}/checkins`);
      const checkin = data.map(r => ({
        ...r,
        distanceTime: formatDistance(new Date(r.createdAt), new Date(), {
          locale: pt,
        }),
      }));
      setCheckins(checkin);
      setLoading(false);
    })();
  }, [isFocused, userId, loading]);

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post(`students/${userId}/checkins`);
      Alert.alert('Checkin realizado com sucesso');
    } catch (error) {
      Alert.alert('Número máximo de checkins semanais atingidos');
    }
  }

  function Content() {
    if (loading) {
      return <ActivityIndicator color="#ee4e62" />;
    }
    return (
      <List
        data={checkins}
        keyExtractor={check => String(check.id)}
        renderItem={({ item }) => (
          <Item>
            <Text>Check-in #{item.id}</Text>
            <Created>{item.distanceTime}</Created>
          </Item>
        )}
      />
    );
  }

  return (
    <Background>
      <Button
        style={{
          marginBottom: 15,
        }}
        onPress={handleSubmit}>
        Novo check-in
      </Button>
      {checkins && <Content />}
    </Background>
  );
}

export default withNavigationFocus(CheckIns);
