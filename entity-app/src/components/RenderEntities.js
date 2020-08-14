import React from 'react';

import Container from './Container';
const RenderEntity = (props) => {
  const { entities } = props;
  if (entities.length === 0) {
    return <p>No entities found</p>;
  }
  return (
    <>
      {entities.map((entity) => (
        <Container entity={entity} key={entity.sys_id} />
      ))}
    </>
  );
};

export default RenderEntity;
