const mongooseModels = require("../models");
const database = require("../config/connection");

module.exports = async (specifiedModel, targetCollection) => {
  try {
    const isModelPresent = await mongooseModels[specifiedModel].db.db
      .listCollections({ name: targetCollection })
      .toArray();

    if (isModelPresent.length > 0) {
      await database.dropCollection(targetCollection);
    }
  } catch (error) {
    throw new Error(error);
  }
};
