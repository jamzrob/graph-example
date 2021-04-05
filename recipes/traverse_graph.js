const g = require("../");

g.V()
  .has("name", "application4")
  .out("appliesTo")
  .values("name")
  .toList()
  .then((l) => console.log("Application 4 went to ", l));

g.V()
  .has("name", "bob")
  .out("completes")
  .out("appliesTo")
  .values("name")
  .toList()
  .then((l) => console.log("Bob applied to ", l));

g.V()
  .has("name", "stephen")
  .out("completes")
  .count()
  .next()
  .then((c) => console.log(`Stephen sent out ${c.value} applications`));

g.V()
  .has("name", "stephen")
  .out("completes")
  .count()
  .next()
  .then((c) => console.log(`Stephen sent out ${c.value} applications`));

g.V()
  .out("created")
  .count()
  .next()
  .then((c) => console.log(`In total there are ${c.value} jobs avaliable`));
