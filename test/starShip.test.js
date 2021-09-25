const handler = require("../src/handler");
const md5 = require("md5");
const ResponseAxiosStarship = require("./responsesAxios/starShip.json");
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

//Test Create Startship
describe("Debe crear un Starship", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.createStarship).toBe("function");
  });
  it("No existe registro en dynamo con este parametro", async () => {
    const eventName = "createStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await DynamoDB.getByID(
      convertNumerToHash(event.pathParameters.number),
      "starship"
    );
    expect(result).toStrictEqual({});
  });
  it("Se debe guardar por no existir en la BD", async () => {
    const result = await DynamoDB.saveItem("starship", ResponseAxiosStarship);
    expect(result).toStrictEqual({
      _id: 123321,
      nombre: "start 9",
    });
  });
  it("Con el siguiente valor se creara un nuevo StarShip", async () => {
    const eventName = "createStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.createStarship(event, null, callback);
    await callback(result);
  });
});

//Test GetAll Starship
describe("Debe traer todo los registros Starship", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.getAllStarship).toBe("function");
  });

  it("Debe traer todos los registros Starship", async () => {
    const eventName = "getStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.getAllStarship(event, null, callback);
    await callback(result);
  });
});

//Test GetRangeLimit Starship
describe("Debe traer los registros limitados Starship", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.getRangeLimitStarship).toBe("function");
  });

  it("Debe traer los registros limitados Starship", async () => {
    const eventName = "getStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.getRangeLimitStarship(event, null, callback);
    await callback(result);
  });
});

//Test PutStarship
describe("Debe actualizar el id enviado del Starship", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.putStarship).toBe("function");
  });

  it("Debe actualizar el id enviado", async () => {
    const eventName = "putStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.putStarship(event, null, callback);
    await callback(result);
  });
});

//Test DeleteStarship
describe("Debe eliminar el id enviado del Starship", () => {
  it("Debe ser una funcion", () => {
    expect(typeof handler.deleteStarship).toBe("function");
  });

  it("Debe eliminar el id enviado del Starship", async () => {
    const eventName = "deleteStarship";
    const event = require(`./events/${eventName}.json`);
    const result = await handler.deleteStarship(event, null, callback);
    await callback(result);
  });
});
