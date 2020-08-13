const url = 'http://localhost:8080/data';

const fetchEntities = () => {
  return window.fetch(url).then((response) => response.json());
};

export default fetchEntities;
