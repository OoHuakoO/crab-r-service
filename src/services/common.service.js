const Location = require("../models/location.model");
const Pool = require("../models/pool.model");

async function findByNameLocation(name) {
  try {
    console.log("start location.service findByNameLocation name:", name);
    const location = await Location.findOne({ name: name });
    return location;
  } catch (error) {
    console.error("location.service error while findByNameLocation:", error);
    throw error;
  }
}

async function createLocation(name) {
  try {
    console.log("start location.service createLocation name:", name);
    const location = await Location.create({ name: name });
    return location;
  } catch (error) {
    console.error("location.service error while createLocation:", error);
    throw error;
  }
}

async function findAllLocation() {
  try {
    console.log("start location.service findAllLocation");
    const locations = await Location.find();
    return locations;
  } catch (error) {
    console.error("location.service error while findAllLocation:", error);
    throw error;
  }
}

async function findByNamePool(name) {
  try {
    console.log("start pool.service findByNamePool name:", name);
    const pool = await Pool.findOne({ name: name });
    return pool;
  } catch (error) {
    console.error("pool.service error while findByNamePool:", error);
    throw error;
  }
}

async function createPool(name) {
  try {
    console.log("start pool.service createPool name:", name);
    const pool = await Pool.create({ name: name });
    return pool;
  } catch (error) {
    console.error("pool.service error while createPool:", error);
    throw error;
  }
}

async function findAllPool() {
  try {
    console.log("start pool.service findAllPool");
    const pools = await Pool.find();
    return pools;
  } catch (error) {
    console.error("pool.service error while findAllPool:", error);
    throw error;
  }
}

module.exports = {
  findByNameLocation,
  createLocation,
  findAllLocation,
  findByNamePool,
  createPool,
  findAllPool,
};
