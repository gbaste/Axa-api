require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const permissionValidation = require('./utils/premission-validation');
const {
  logic
} = require('./logic');

const {
  env: {
    TOKEN_SECRET,
    TOKEN_EXP
  }
} = process;

const router = express.Router();

const jsonBodyParser = bodyParser.json();

router.post('/auth', [jsonBodyParser], (req, res) => {
  const {
    body: {
      email,
      password
    }
  } = req;

  logic.authenticateUser(email, password)
    .then(({
      role
    }) => {
      const token = jwt.sign({
        role
      }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXP
      })

      res.status(200).json({
        status: 'Succesfully logged',
        data: {
          token
        }
      });
    })
    .catch(err => {
      const {
        message
      } = err;

      res.status(err instanceof Error ? 400 : 500).json({
        message
      });
    });
});

router.get('/company/user/:id', [jsonBodyParser], (req, res) => {
  const {
    params: {
      id
    }
  } = req;

  logic
    .searchUserById(id)
    .then(res.json.bind(res))
    .catch(err => {
      const {
        message
      } = err;

      res.status(err instanceof Error ? 400 : 500).json({
        message
      });
    });
});

router.get('/company/user', [jsonBodyParser], (req, res) => {
  const {
    query: {
      name
    }
  } = req;

  logic
    .searchUserByName(name)
    .then(res.json.bind(res))
    .catch(err => {
      const {
        message
      } = err;

      res.status(err instanceof Error ? 400 : 500).json({
        message
      });
    });
});

router.get('/policies/user/', [jsonBodyParser, permissionValidation('admin')], (req, res) => {
  const {
    query: {
      name
    }
  } = req;

  logic
    .searchUserPoliciesByName(name)
    .then(res.json.bind(res))
    .catch(err => {
      const {
        message
      } = err;

      res.status(err instanceof Error ? 400 : 500).json({
        message
      });
    });
});

router.get('/policies/:id/user', [jsonBodyParser, permissionValidation('admin')], (req, res) => {
  const {
    params: {
      id
    }
  } = req;

  logic
    .searchUserByPolicieId(id)
    .then(res.json.bind(res))
    .catch(err => {
      const {
        message
      } = err;

      res.status(err instanceof Error ? 400 : 500).json({
        message
      });
    });
});

module.exports = router;