const axios = require("axios");
const modelStarships = require("../models/starshipsModel");
const modelVehicles = require("../models/vehiclesModel");
const { restClient } = require("../../../config/axios/index");
const responses = require("../../../config/responses/apiResponses");

const getStarships = async (number) => {
  try {
    const data = await restClient(
      `https://swapi.py4e.com/api/starships/${number}`,
      "GET",
      {}
    );
    const { statusCode, body } = data;

    if (statusCode != 200) {
      return data;
    } else {
      console.log("Body del api externo", JSON.parse(body));
      const startShips = new modelStarships(JSON.parse(body));
      return responses._200({ ...startShips });
    }
  } catch (error) {
    console.log("Ingresó en el catch", error);
    return responses._500({ mesagge: "Error to execute getStarships", error });
  }
};

const getVehicle = async (number) => {
  try {
    const data = await restClient(
      `https://swapi.py4e.com/api/vehicles/${number}`,
      "GET",
      {}
    );
    const { statusCode, body } = data;

    if (statusCode != 200) {
      return data;
    } else {
      console.log("Body del api externo", JSON.parse(body));
      const startShips = new modelVehicles(JSON.parse(body));
      return responses._200({ ...startShips });
    }
  } catch (error) {
    console.log("Ingresó en el catch", error);
    return responses._500({ mesagge: "Error to execute getVehicle", error });
  }
};

module.exports = {
  getStarships,
  getVehicle,
};
