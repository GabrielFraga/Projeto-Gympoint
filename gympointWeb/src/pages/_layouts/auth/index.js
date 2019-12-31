import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function AuthtLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
AuthtLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
