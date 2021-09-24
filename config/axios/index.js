const axios = require("axios");
const responses = require("../responses/apiResponses");

const axiosClient = {
  restClient: async (url, method, body = {}) => {
    try {
      const { data } = await axios({
        url: `${url}`,
        method: `${method}`,
        data: `${body}`,
      });
      return responses._200(data);
    } catch (error) {
      //throw new Error("Error")
      return responses._500({ msm: "Error in the axiosClient", error });
    }
  },
};

module.exports = axiosClient;
