const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');

router.get('/zookeepers', (req, res) => {
  console.log("\n router GET /zookeepers = ");
  console.log(req.query);
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
  console.log("\n router GET /zookeepers/:id = ");
  console.log(req.query);
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/zookeepers', (req, res) => {
  console.log("\n router POST /zookeepers = ");
  console.log(req.query);
  req.body.id = zookeepers.length.toString();

  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted.');
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeeper);
  }
});

module.exports = router;
