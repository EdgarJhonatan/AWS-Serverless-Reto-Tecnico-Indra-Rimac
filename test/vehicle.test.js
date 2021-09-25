const handler = require("../src/handler");
const md5 = require("md5");
const ResponseAxiosVehicle = require("./responsesAxios/vehicle.json");
const DynamoDB = require("../config/db/dynamo/querys");
const callback = async () =>
  jest.fn((x) => {
    return x;
  });
jest.mock("../config/db/dynamo/querys", () => ({
  getByID: jest.fn(() => ({
    //Item: {}
  })),
  saveItem: jest.fn(() => ({
    _id: 123321,
    nombre: "start 9",
  })),
}));

jest.mock("../config/axios/index", () => ({
  restClient: jest.fn(() => ({
    statusCode: 200,
    body: "{}",
  })),
}));

function convertNumerToHash(numberStarship) {
  return md5(numberStarship);
}

//Test Create Vehicle
describe("Debe crear un Vehicle", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.createVehicle).toBe("function");
  });
  it("No existe registro en dynamo con este parametro", async () => {
    const eventName = "createVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await DynamoDB.getByID(
      convertNumerToHash(event.pathParameters.number),
      "vehicle"
    );
    expect(result).toStrictEqual({});
  });
  it("Se debe guardar por no existir en la BD", async () => {
    const result = await DynamoDB.saveItem("vechicle", ResponseAxiosVehicle);
    expect(result).toStrictEqual({
      _id: 123321,
      nombre: "start 9",
    });
  });
  it("Con el siguiente valor se creara un nuevo Vehicle", async () => {
    const eventName = "createVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.createVehicle(event, null, callback);
    await callback(result);
  });
});

//Test GetAll Vehicle
describe("Debe traer todo los registros Vehicle", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.getAllVehicle).toBe("function");
  });

  it("Debe traer todos los registros Vehicle", async () => {
    const eventName = "getVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.getAllVehicle(event, null, callback);
    await callback(result);
  });
});

//Test GetRangeLimit Vehicle
describe("Debe traer  los registros limitados Vehicle", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.getRangeLimitVehicle).toBe("function");
  });

  it("Debe traer los registros limitados Vehicle", async () => {
    const eventName = "getVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.getRangeLimitVehicle(event, null, callback);
    await callback(result);
  });
});

//Test PutVehicle
describe("Debe actualizar el id enviado del Vehicle", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.putVehicle).toBe("function");
  });

  it("Debe actualizar el id enviado", async () => {
    const eventName = "putVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.putVehicle(event, null, callback);
    await callback(result);
  });
});

//Test DeleteVehicle
describe("Debe eliminar el id enviado del Vehicle", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.deleteVehicle).toBe("function");
  });

  it("Debe eliminar el id enviado del Vehicle", async () => {
    const eventName = "putVehicle";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.deleteVehicle(event, null, callback);
    await callback(result);
  });
});
