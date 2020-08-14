import React from 'react';

const Card = (props) => {
  const { entity } = props;
  return (
    <div className="card">
      <div className="card-header">
        <p>{entity.name}</p>
      </div>
      <div className="card-desc">
        <p>{entity.short_description}</p>
      </div>
    </div>
  );
};

export default Card;
