import React from 'react';
import Container from './Container';
const NoChildParent = (props) => {
  const { entities } = props;
  return <Container entities={entities} />;
};

export default NoChildParent;
