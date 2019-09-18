require('dotenv').config();

const {
  logic
} = require('.');

const {
  validateStringField
} = require('../utils/validateStringField');

describe('logic', () => {
  const id = 'a0ece5db-cd14-4f21-812f-966633e7be86';
  const badId = 'a0ece5db-cd14-4f21-812f-4332434234';
  const badName = 'Jesus';
  const name = 'Britney';
  const policieId = '64cceef9-3a01-49ae-a23b-3761b604800b';
  const email = 'manningblankenship@quotezart.com';
  const password = 'Axa123';
  const role = 'admin';
  const userNameWithoutPolicies = 'Barnett';

  describe('validate fields', () => {
    it('should succeed on correct value', () => {
      expect(validateStringField('id', id)).toBeTruthy();
    });

    it('should fail on undefined value', () => {
      expect(validateStringField('id', undefined)).toBeFalsy()
    });

    it('should fail on empty value', () => {
      expect(validateStringField('id', '')).toBe(false);
    });

    it('should fail on numeric value', () => {
      expect(validateStringField('id', 123)).toBe(false);
    });
  });

  describe('authenticate user', () => {
    it('should authenticate correctly a user', () => {
      logic.authenticateUser(email, password)
        .then(user => {
          expect(user.email).toBe(email);
          expect(user.role).toBe(role);
        });
    });

    it('should throw invalid credentials', () => {
      logic.authenticateUser(email, 'bad123')
        .catch(err => err)
        .then(({
          message
        }) => expect(message).toBe('Invalid credentials'));
    });

    it('should throw an error when putting an invalid email parameter', () => {
      logic.authenticateUser(false, 'bad123')
        .catch(err => err)
        .then(({
          message
        }) => expect(message).toBe('Invalid Email'));
    });

    it('should throw an error when putting an invalid password parameter', () => {
      logic.authenticateUser(email, false)
        .catch(err => err)
        .then(({
          message
        }) => expect(message).toBe('Invalid Password'));
    });
  });

  describe('search user id', () => {
    it('search user by id', () =>
      logic
      .searchUserById(id)

      .then(res => {
        expect(res.name).toBe('Britney');
        expect(res.email).toBe('britneyblankenship@quotezart.com');
      }));

    it('should fail on trying to search user with bad id', () =>
      logic
      .searchUserById(badId)
      .catch(err => err)
      .then(({
          message
        }) =>
        expect(message).toBe(`Client with ${badId} id does not exist`)
      ));

    it('should fail on trying to search user with an undefined id', () =>
      logic
      .searchUserById(undefined)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid ID')));

    it('should fail on trying to search user with an empty id', () =>
      logic
      .searchUserById('')
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid ID')));

    it('should fail on trying to search user with a numeric id', () =>
      logic
      .searchUserById(123)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid ID')));
  });

  describe('search user name', () => {
    it('search user by name', () =>
      logic
      .searchUserByName(name)

      .then(res => {
        expect(res.name).toBe('Britney');
        expect(res.email).toBe('britneyblankenship@quotezart.com');
      }));

    it('should fail on trying to search user with bad name', () =>
      logic
      .searchUserByName(badName)
      .catch(err => err)
      .then(({
          message
        }) =>
        expect(message).toBe(`Client with ${badName} name does not exist`)
      ));

    it('should fail on trying to search user with an undefined name', () =>
      logic
      .searchUserByName(undefined)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));

    it('should fail on trying to search user with an empty name', () =>
      logic
      .searchUserByName('')
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));

    it('should fail on trying to search user with a numeric name', () =>
      logic
      .searchUserByName(123)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));
  });

  describe('search user policies', () => {
    it('search user policies by name', () =>
      logic
      .searchUserPoliciesByName(name)

      .then(res => {
        expect(res.length).toBe(102);
      }));

    it('should fail on trying to search user policies with bad name', () =>
      logic
      .searchUserPoliciesByName(badName)
      .catch(err => err)
      .then(({
          message
        }) =>
        expect(message).toBe(`Client with ${badName} name does not exist`)
      ));

    it('should fail when searching a user without any policies', () =>
      logic
      .searchUserPoliciesByName(userNameWithoutPolicies)
      .catch(err => err)
      .then(({
          message
        }) =>
        expect(message).toBe(`Policies for ${userNameWithoutPolicies} does not exist`)
      ));

    it('should fail on trying to search user policies with an undefined name', () =>
      logic
      .searchUserPoliciesByName(undefined)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));

    it('should fail on trying to search user policies with an empty name', () =>
      logic
      .searchUserPoliciesByName('')
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));

    it('should fail on trying to search user policies with a numeric name', () =>
      logic
      .searchUserPoliciesByName(123)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Name')));
  });

  describe('search policies by client', () => {
    it('search user policies by id', () =>
      logic
      .searchUserByPolicieId(policieId)

      .then(res => {
        expect(res.name).toBe('Manning');
        expect(res.email).toBe('manningblankenship@quotezart.com');
      }));

    it('should fail on trying to search user policies with bad id', () =>
      logic
      .searchUserByPolicieId(badId)
      .catch(err => err)
      .then(({
          message
        }) =>
        expect(message).toBe(`Policie with ${badId} does not exist`)
      ));

    it('should fail on trying to search user policies with an undefined id', () =>
      logic
      .searchUserByPolicieId(undefined)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Policie ID')));

    it('should fail on trying to search user policies with an empty id', () =>
      logic
      .searchUserByPolicieId('')
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Policie ID')));

    it('should fail on trying to search user policies with a numeric id', () =>
      logic
      .searchUserByPolicieId(123)
      .catch(err => err)
      .then(({
        message
      }) => expect(message).toBe('Invalid Policie ID')));
  });
});