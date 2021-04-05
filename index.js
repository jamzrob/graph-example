const gremlin = require("gremlin");
const __ = gremlin.process.statics;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const config = require("./config/config");

dc = new DriverRemoteConnection(`${config.neptune_local.endpoint}`, {});

console.log(`Connecting to ${config.neptune_local.endpoint}`);

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

/**
 * Create a new vertex with Id, Label and properties
 * @param {String} vlabel Vertex Label
 * @param {String,Number} vertexId Vertex Id (assuming the graph database allows id assignment)
 */
const createVertex = async (vlabel, username, email) => {
  const vertex = await g
    .addV(vlabel)
    .property("username", username)
    .property("email", email)
    .next();

  return vertex.value;
};

createVertex("user", "jamesraub", "james.s.raubenheimer@vanderbilt.edu");
createVertex("user", "willz", "willz@gmail.com");
createVertex("user", "yigitatay", "yigitatay@gmail.com");

/**
 * Create a new edge between two vertices
 * @param {String} v1 First Vertex ID
 * @param {Number} v2 Second Vertex ID
 * @param {String} vlabel Vertex Label
 */
const createEdge = async (v1, v2, vlabel) => {
  const edge = await g.addE(v1, v2, vlabel);

  return edge.value;
};

/**
 * Gets vertex with property
 * @param {String} prop Vertex propety
 * @param {String} value Vertex value
 */
const getId = async (prop, val) => {
  return g.V().has(prop, val).next();
};

module.exports = g;
