const Responses = {
   _DefineResponse(statusCode = 502, data = {}) {
      return {
         statusCode,
         body: JSON.stringify(data),
      };
   },

   _200(data = {}) {
      return this._DefineResponse(200, data);
   },

   _201(data = {}) {
      return this._DefineResponse(201, data);
   },

   _404(data = {}) {
      return this._DefineResponse(404, data);
   },

   _400(data = {}) {
      return this._DefineResponse(400, data);
   },

   _500(data = {}) {
      return this._DefineResponse(500, data);
   },
};

module.exports = Responses;
