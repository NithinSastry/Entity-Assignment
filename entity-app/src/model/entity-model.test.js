import EntityModel from './entity-model';

test('entity model is intialised properly', () => {
  const entityModel = new EntityModel();

  expect(entityModel).toHaveProperty('loaded', false);
  expect(entityModel).toHaveProperty('subscibers', []);
  expect(entityModel).toHaveProperty('entityMap', {});
});
