import React from 'react';

const Container = (props) => {
  const { entities } = props;
  if (entities.length === 0) {
    return <p>No entities found</p>;
  }
};

export default Container;
