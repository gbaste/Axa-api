const fetch = require("isomorphic-fetch");
const { validateStringField } = require("../utils/validateStringField");

const companyClientsUrl = "http://www.mocky.io/v2/5808862710000087232b75ac";
const policiesClientsUrl = "http://www.mocky.io/v2/580891a4100000e8242b75c5";

const logic = {
  searchUserById(id) {
    return Promise.resolve()
      .then(() => {
        if (!validateStringField("id", id)) throw Error("Invalid ID");
      })
      .then(() => fetch(companyClientsUrl))
      .then(response => response.json())
      .then(({ clients }) => clients.find(client => client.id === id))
      .then(client => {
        if (!client) throw Error(`Client with ${id} id does not exist`);

        return client;
      });
  },

  searchUserByName(name) {
    return Promise.resolve()
      .then(() => {
        if (!validateStringField("name", name)) throw Error("Invalid Name");
      })
      .then(() => fetch(companyClientsUrl))
      .then(response => response.json())
      .then(({ clients }) =>
        clients.find(client => client.name.toLowerCase() === name.toLowerCase())
      )
      .then(client => {
        if (!client) throw Error(`Client with ${name} name does not exist`);

        return client;
      });
  },

  searchUserPoliciesByName(name) {
    return Promise.resolve()
      .then(() => {
        if (!validateStringField("name", name)) throw Error("Invalid Name");
      })
      .then(() => fetch(companyClientsUrl))
      .then(response => response.json())
      .then(({ clients }) =>
        clients.find(client => client.name.toLowerCase() === name.toLowerCase())
      )
      .then(client => {
        if (!client) throw Error(`Client with ${name} name does not exist`);

        const { id, role } = client;

        if (role === "user") throw Error(`Client ${name} not have permissions`);

        return fetch(policiesClientsUrl)
          .then(response => response.json())
          .then(({ policies }) =>
            policies.filter(policie => policie.clientId === id)
          )
          .then(policie => {
            if (!policie.length)
              throw Error(`Policies for ${name} does not exist`);

            return policie;
          });
      });
  },

  searchPolicieByUserId(policieId) {
    return Promise.resolve()
      .then(() => {
        if (!validateStringField("PoliceID", policieId))
          throw Error("Invalid Policie ID");
      })
      .then(() => fetch(policiesClientsUrl))
      .then(response => response.json())
      .then(({ policies }) =>
        policies.find(policie => policie.id === policieId)
      )
      .then(policie => {
        if (!policie) throw Error(`Policie with ${policieId} does not exist`);

        const { clientId } = policie;

        return fetch(companyClientsUrl)
          .then(response => response.json())
          .then(({ clients }) => clients.find(client => client.id === clientId))
          .then(client => {
            if (client.role === "user")
              throw Error(`Client ${client.name} not have permissions`);
            return client;
          });
      });
  }
};

module.exports = {
  logic
};
