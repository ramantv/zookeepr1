const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => {
  let results = animals;
  console.log("\n router GET /animals query = ");
  console.log("query = " + JSON.stringify(req.query));
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
  console.log("\n router GET /animals/:id query = ");
  console.log("query = " + JSON.stringify(req.query));
  console.log("params = " + JSON.stringify(req.params));
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();
  console.log("\n router POST /animals query = ");
  console.log("query = " + JSON.stringify(req.query));
  //console.log(req.query);

  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports = router;
