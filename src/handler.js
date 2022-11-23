"use strict";
const consumer = require("./externals/consumer/index");
const md5 = require("md5");
const responses = require("../config/responses/apiResponses");
const dynamo = require("../config/db/dynamo/querys");

//Tables Dynamo
const tableStarship = process.env.TABLE_STARSHIP || "starship";
const tableVehicle = process.env.TABLE_VEHICLE || "vehicle";

// Ordernar los items de cada tabla.
function sortBtId(a, b) {
   if (a.createdAt > b.createdAt) return -1;
   return 1;
}

/**
 * @SECCION
 * @STARTSHIPS
 * Seccion de Lambdas para el modelo "STARTSHIPS"
 **/

/** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.createStarship = async (event, context, callback) => {
   try {
      const numberStarship = event.pathParameters.number;
      const res = await dynamo.getByID(md5(numberStarship), tableStarship);
      console.log("Respuesta del dynamoDb", res);
      if (!res || !res.Item) {
         const starShip = await consumer.getStarships(numberStarship);
         console.log("Respuesta The Star Wars API startShips", starShip);
         const { statusCode, body } = starShip;
         if (statusCode != 200) {
            throw new Error("Error al consumir servicio The Star Wars API");
         } else {
            const dataInput = {
               id: md5(numberStarship),
               createAt: new Date().toISOString(),
               ...JSON.parse(body),
            };
            await dynamo.saveItem(tableStarship, dataInput);
            //return callback(null, responses._201(dataInput));
            return responses._201(dataInput);
         }
      } else {
         //return callback(null, responses._200(res.Item));
         return responses._200(res.Item);
      }
   } catch (error) {
      console.log("Ingresó al catch", error);
      return callback(null, responses._500({ message: error.message }));
   }
};

/** REALIZA LA QUERY A DYNAMODB, OBTIENE TODOS LOS DATOS GUARDADOS  */
module.exports.getAllStarship = async (event, context, callback) => {
   try {
      const res = await dynamo.getAll(tableStarship);
      return callback(null, responses._200(res.Items.sort(sortBtId)));
   } catch (error) {
      return callback(null, responses._500({ message: error.message }));
   }
};

/** REALIZA LA QUERY A DYNAMODB DE CIERTO RANGO DE REGISTROS */
module.exports.getRangeLimitStarship = async (event, context, callback) => {
   try {
      const numberStartship = event.pathParameters.number;
      const res = await dynamo.getItemLimit(tableStarship, numberStartship);
      return callback(null, responses._200(res.Items.sort(sortBtId)));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};

/** REALIZA LA QUERY A DYNAMODB, ACTUALIZA SI EXISTE, SINO NO ACTUALIZA */
module.exports.putStarship = async (event, context, callback) => {
   try {
      const idStarship = event.pathParameters.id;
      const dataForm = JSON.parse(event.body);
      const paramName = dataForm.paramName;
      const paramValue = dataForm.paramValue;

      console.log("dataForm", dataForm, idStarship);

      await dynamo.updateItem(idStarship, tableStarship, paramName, paramValue);
      return callback(null, responses._200({ message: "Update Success" }));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};

/** REALIZA LA QUERY A DYNAMODB, ELIMINA EL REGISTRO */
module.exports.deleteStarship = async (event, context, callback) => {
   try {
      const idStarship = event.pathParameters.id;
      await dynamo.deleteIten(idStarship, tableStarship);
      return callback(null, responses._200({ message: "Delete Success" }));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};

/**
 * @SECCION
 * @VEHICLE
 * Seccion de Lambdas para el modelo "VEHICLE"
 **/

/** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.createVehicle = async (event, context, callback) => {
   try {
      const numberVehicle = event.pathParameters.number;
      const res = await dynamo.getByID(md5(numberVehicle), tableVehicle);
      console.log("Respuesta del dynamoDb", res);
      if (!res || !res.Item) {
         const starVehicle = await consumer.getVehicle(numberVehicle);
         console.log("Respuesta The Star Wars API starVehicle", starVehicle);
         const { statusCode, body } = starVehicle;
         if (statusCode != 200) {
            throw new Error("Error al consumir servicio The Star Wars API");
         } else {
            const dataInput = {
               id: md5(numberVehicle),
               createAt: new Date().toISOString(),
               ...JSON.parse(body),
            };
            await dynamo.saveItem(tableVehicle, dataInput);
            return callback(null, responses._201(dataInput));
         }
      } else {
         return callback(null, responses._200(res.Item));
      }
   } catch (error) {
      console.log("Ingresó al catch", error);
      return callback(null, responses._500({ message: error.message }));
   }
};

/** REALIZA LA QUERY A DYNAMODB, OBTIENE TODOS LOS DATOS GUARDADOS  */
module.exports.getAllVehicle = async (event, context, callback) => {
   try {
      const res = await dynamo.getAll(tableVehicle);
      return callback(null, responses._200(res.Items.sort(sortBtId)));
   } catch (error) {
      return callback(null, responses._500({ message: error.message }));
   }
};

/** REALIZA LA QUERY A DYNAMODB DE CIERTO RANGO DE REGISTROS */
module.exports.getRangeLimitVehicle = async (event, context, callback) => {
   try {
      const numberVehicle = event.pathParameters.number;
      const res = await dynamo.getItemLimit(tableVehicle, numberVehicle);
      return callback(null, responses._200(res.Items.sort(sortBtId)));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};

/** REALIZA LA QUERY A DYNAMODB, ACTUALIZA SI EXISTE, SINO NO ACTUALIZA */
module.exports.putVehicle = async (event, context, callback) => {
   try {
      const idVehicle = event.pathParameters.id;
      const dataForm = JSON.parse(event.body);
      const paramName = dataForm.paramName;
      const paramValue = dataForm.paramValue;

      await dynamo.updateItem(idVehicle, tableVehicle, paramName, paramValue);
      return callback(null, responses._200({ message: "Update Success" }));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};

/** REALIZA LA QUERY A DYNAMODB, ELIMINA EL REGISTRO */
module.exports.deleteVehicle = async (event, context, callback) => {
   try {
      const idVehicle = event.pathParameters.id;
      await dynamo.deleteIten(idVehicle, tableVehicle);
      return callback(null, responses._200({ message: "Delete Success" }));
   } catch (error) {
      return callback(null, responses._500(error));
   }
};
