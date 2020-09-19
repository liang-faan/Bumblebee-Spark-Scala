'use strict';
const express_openapi_validator_1 = require("express-openapi-validator");
const tokenService = require("./TokenService")
// const swagger_router_1 = require("SwaggerRouter");
const swagger_parameters_1 = require("oas3-tools/dist/middleware/swagger.parameters");
var swagger_router_1 = require('oas3-tools/dist/middleware/swagger.router');
/**
 * User Authentication
 *
 * body Login Input user authentication
 * returns UserAccess
 **/
exports.userLogin = function (body) {
  console.log(JSON.stringify(body))
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "accesssToken": "accesssToken",
      "refreshToken": "refreshToken"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

exports.addValidator=function(expressAppConfig) {
  new express_openapi_validator_1.OpenApiValidator({
      apiSpec: expressAppConfig.definitionPath,
      validateSecurity: {
        handlers: {
          bearerAuth: tokenService.TokenVerify
        }
      }
  })
      .install(expressAppConfig.app)
      .then(() => {
          expressAppConfig.app.use(new swagger_parameters_1.SwaggerParameters().checkParameters());
          expressAppConfig.app.use(new swagger_router_1.SwaggerRouter().initialize(expressAppConfig.routingOptions));
          expressAppConfig.app.use((err, req, res, next) => {
          // format errors
          res.status(err.status || 500).json({
              message: err.message,
              errors: err.errors,
          });
      });
  });
}


