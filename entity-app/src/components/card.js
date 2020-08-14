import React from 'react';

const Card = (props) => {
  const { entity } = props;
  return (
    <div className="card">
      <p className="card-header">{entity.name}</p>
      <p className="card-desc">{entity.short_description}</p>
    </div>
  );
};

export default Card;
