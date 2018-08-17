const axios = require('axios');

let data = [];

axios
  .get('https://www.swapi.co/api/people')
  .then(response => data.push(...response.data.results))
  .catch(err => console.log(err));

const getPeople = (req, res, next) => {
  res.status(200).json(data);
};

const addPerson = (req, res, next) => {
  data.push(req.body);
  res.status(200).send(data);
};

const deletePerson = (req, res, next) => {
  //   if (!data.find(val => val.name === req.params.id)) {
  //     res.status(304).send(`No Person With Name ${req.params.name}`);
  //   }
  const filtered = data.filter(val => val.name !== parseInt(req.params.id));
  data = filtered;
  res.status(200).send(data);
};

////// Hit api for more info on item
// const getMoreDataOnOnePerson = (req, res) => {
//   axios
//     .get(`https://www.swapi.co/api/people/${req.params.name}`)
//     .then(response => {
//       res.status(200).send(response.data.results);
//     });
// };

module.exports = {
  getPeople,
  addPerson,
  deletePerson
};
