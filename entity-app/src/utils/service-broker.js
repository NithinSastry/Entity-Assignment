const url = 'http://localhost:8080/data';

const fetchEntities = () => {
  window
    .fetch(url)
    .then((response) => response.json())
    .then((result) => console.log(result));
};

export default fetchEntities;
