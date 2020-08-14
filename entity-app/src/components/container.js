import React from 'react';
import Card from './Card';
// const renderEntity = (entity) => {
//   if (!entity.children) {
//     return (
//       <div key={entity.sys_id} className="entity-nochild-noparent">
//         <p>{entity.name}</p>
//       </div>
//     );
//   } else {
//     return (
//       <div key={entity.sys_id} className="entity-with-children">
//         <p>{entity.name}</p>
//         {entity.children.map((entity) => (
//           <Card entity={entity} />
//         ))}
//       </div>
//     );
//   }
// };

const renderChildren = (entity) => {
  return entity.children.map((child) => (
    <Card entity={child} key={entity.sys_id} />
  ));
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
