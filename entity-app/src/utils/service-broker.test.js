import fetchEntities from './service-broker';
import entities from './mockdata';
test('fetchEntities resolves to proper data', () => {
  return fetchEntities().then((data) => {
    expect(data).toStrictEqual(entities.data);
  });
});
