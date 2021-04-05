const config = require("../config/config");
const gremlin = require("gremlin");

const client = new gremlin.driver.Client(config.neptune_local.endpoint, {
  traversalSource: "g",
});

client
  .submit("g.V().group().by().by(both().count())")
  .then((t) =>
    console.log(
      "Degree centrality is a measure of the number of edges associated to each vertex",
      t
    )
  );
