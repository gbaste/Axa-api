require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { logic } = require("./logic");

const router = express.Router();

const jsonBodyParser = bodyParser.json();

router.get("/company/user/:id", [jsonBodyParser], (req, res) => {
  const {
    params: { id }
  } = req;

  logic
    .searchUserById(id)
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof Error ? 400 : 500).json({ message });
    });
});

router.get("/company/user", [jsonBodyParser], (req, res) => {
  const {
    query: { name }
  } = req;

  logic
    .searchUserByName(name)
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof Error ? 400 : 500).json({ message });
    });
});

router.get("/policies/user/", [jsonBodyParser], (req, res) => {
  const {
    query: { name }
  } = req;

  logic
    .searchUserPoliciesByName(name)
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof Error ? 400 : 500).json({ message });
    });
});

router.get("/policies/:id/user", [jsonBodyParser], (req, res) => {
  const {
    params: { id }
  } = req;

  logic
    .searchPolicieByUserId(id)
    .then(res.json.bind(res))
    .catch(err => {
      const { message } = err;

      res.status(err instanceof Error ? 400 : 500).json({ message });
    });
});

module.exports = router;
