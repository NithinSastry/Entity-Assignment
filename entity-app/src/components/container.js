import React from 'react';
import Card from './Card';
import RenderEntities from './RenderEntities';

const renderChildren = (entity) => {
  return entity.children.map((child) => {
    if (child.children && child.children.length > 0) {
      return <RenderEntities key={child.sys_id} entities={[child]} />;
    } else {
      return <Card entity={child} key={child.sys_id} />;
    }
  });
};

const Container = (props) => {
  const { entity } = props;
  return (
    <div className="container">
      <div className="container-heading">
        <p>{entity.name}</p>
      </div>
      <div className="container-children">
        {entity.children &&
          entity.children.length > 0 &&
          renderChildren(entity)}
      </div>
    </div>
  );
};

export default Container;
