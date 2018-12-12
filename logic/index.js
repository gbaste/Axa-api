const es6 = require("es6-promise").polyfill();
const fetch = require("isomorphic-fetch");

const companyClientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policiesClientsUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

const logic = {
  basicSearchCompanyClients() {
    return Promise.resolve()
      .then(() => {
        return fetch(companyClientsUrl);
      })
      .then(function(response) {
        return response.json();
      });
  },

  basicSearchCompanyPolicies() {
    return Promise.resolve()
      .then(() => {
        return fetch(policiesClientsUrl);
      })
      .then(function(response) {
        return response.json();
      });
  }
};

class LogicError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  logic,
  LogicError
};
