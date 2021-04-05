const gremlin = require("gremlin");
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const config = require("../config/config");

dc = new DriverRemoteConnection(`${config.neptune_local.endpoint}`, {});

console.log(`Connecting to ${config.neptune_local.endpoint}`);

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

g.V()
  .out("tagged")
  .count()
  .next()
  .then((c) => console.log(`${c.value} users have been tagged in trips`));

g.V()
  .has("username", "asafroth")
  .out("went")
  .values("location")
  .toList()
  .then((l) => console.log(`Asaf has gone to ${l}`));

g.V()
  .has("username", "kristenmjohnson")
  .out("tagged")
  .out("went")
  .values("location")
  .toList()
  .then((l) => console.log(`Kristen's friends have been to ${l}`));

g.V()
  .has("username", "jamzrob")
  .out("tagged")
  .out("tagged")
  .out("went")
  .count()
  .next()
  .then((c) =>
    console.log(`James's friends' friends have been to ${c.value} locations`)
  );

g.V()
  .has("location", "Amsterdam")
  .both("went")
  .values("username")
  .toList()
  .then((l) => console.log(`${l} have been to Amesterdamn`));

g.V()
  .has("username", "jamzrob")
  .as("a")
  .V()
  .has("username", "faythegomolka")
  .as("b")
  .both("went")
  .values("username")
  .toList()
  .then((l) => console.log(`${l} have been to Amesterdamn`));

const client = new gremlin.driver.Client(config.neptune_local.endpoint, {
  traversalSource: "g",
});
