import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

import Header from '~/components/Header';

import Body from '~/components/Body';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
    </Wrapper>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
