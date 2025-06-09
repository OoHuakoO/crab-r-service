const Location = require("../models/location.model");

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

async function upsertLocation(name, maxPool) {
  try {
    console.log("start location.service createLocation name:", name);
    const location = await Location.findOneAndUpdate(
      { name }, 
      { name, maxPool }, 
      {
        new: true,
        upsert: true, 
        setDefaultsOnInsert: true, 
      }
    );
    return location;
  } catch (error) {
    console.error("location.service error while upsertLocation:", error);
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

module.exports = {
  findByNameLocation,
  upsertLocation,
  findAllLocation,
};
