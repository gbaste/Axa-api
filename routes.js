require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { logic, LogicError } = require("./logic");

const router = express.Router();

const jsonBodyParser = bodyParser.json();

//BASIC ROUTES//

router.get("/company", [jsonBodyParser], (req, res) => {
  logic
    .basicSearchCompanyClients()
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof LogicError ? 400 : 500).json({ message });
    });
});

router.get("/policies", [jsonBodyParser], (req, res) => {
  logic
    .basicSearchCompanyPolicies()
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof LogicError ? 400 : 500).json({ message });
    });
});

module.exports = router;
