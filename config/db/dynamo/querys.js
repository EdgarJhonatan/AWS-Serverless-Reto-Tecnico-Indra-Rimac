const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: "http://localhost:3000",
    region: "local-env",
    sslEnabled: false,
  };
}

const Dynamo = {
  async saveItem(TableName, Item) {
    const data = await db
      .put({
        TableName: TableName,
        Item: Item,
      })
      .promise();

    return data;
  },

  async getByID(ID, TableName) {
    const data = await db
      .get({
        TableName: TableName,
        Key: {
          id: ID,
        },
      })
      .promise();

    return data;
  },

  async getAll(TableName) {
    const data = await db
      .scan({
        TableName: TableName,
      })
      .promise();

    return data;
  },

  async updateItem(ID, TableName, KeyAttribute, KeyValue) {
    const data = await db
      .update({
        TableName: TableName,
        Key: { id: ID },
        UpdateExpression: `set ${KeyAttribute} = :v`,
        ExpressionAttributeValues: {
          ":v": KeyValue,
        },
        //ReturnValues: 'ALL_NEW' //NONE ALL_OLD UPDATED_OLD ALL_NEW UPDATED_NEW
      })
      .promise();
    console.log(data);
    return data;
  },

  async deleteIten(ID, TableName) {
    const data = await db
      .delete({
        TableName: TableName,
        Key: { id: ID },
      })
      .promise();

    return data;
  },

  async getItemLimit(TableName, Limit) {
    const data = await db
      .scan({
        TableName: TableName,
        Limit: Limit,
      })
      .promise();

    return data;
  },
};

module.exports = Dynamo;
