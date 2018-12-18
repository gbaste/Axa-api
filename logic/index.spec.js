require('dotenv').config();

const { expect } = require('chai');
const { logic } = require('.');
const { validateStringField } = require('../utils/validateStringField');

describe('logic', () => {
  const id = 'a0ece5db-cd14-4f21-812f-966633e7be86';
  const badId = 'a0ece5db-cd14-4f21-812f-4332434234';
  const badName = 'Jesus';
  const name = 'Britney';
  const policieId = '64cceef9-3a01-49ae-a23b-3761b604800b';

  describe('validate fields', () => {
    it('should succeed on correct value', () => {
      expect(() => validateStringField('id', id).to.equal(id));
    });

    it('should fail on undefined value', () => {
      expect(validateStringField('id', undefined)).to.equal(false);
    });

    it('should fail on empty value', () => {
      expect(validateStringField('id', '')).to.equal(false);
    });

    it('should fail on numeric value', () => {
      expect(validateStringField('id', 123)).to.equal(false);
    });
  });

  describe('search user id', () => {
    it('search user by id', () =>
      logic
        .searchUserById(id)

        .then(res => {
          expect(res.name).to.equal('Britney');
          expect(res.email).to.equal('britneyblankenship@quotezart.com');
        }));

    it('should fail on trying to search user with bad id', () =>
      logic
        .searchUserById(badId)
        .catch(err => err)
        .then(({ message }) =>
          expect(message).to.equal(`Client with ${badId} id does not exist`)
        ));

    it('should fail on trying to search user with an undefined id', () =>
      logic
        .searchUserById(undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid ID')));

    it('should fail on trying to search user with an empty id', () =>
      logic
        .searchUserById('')
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid ID')));

    it('should fail on trying to search user with a numeric id', () =>
      logic
        .searchUserById(123)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid ID')));
  });

  describe('search user name', () => {
    it('search user by name', () =>
      logic
        .searchUserByName(name)

        .then(res => {
          expect(res.name).to.equal('Britney');
          expect(res.email).to.equal('britneyblankenship@quotezart.com');
        }));

    it('should fail on trying to search user with bad name', () =>
      logic
        .searchUserByName(badName)
        .catch(err => err)
        .then(({ message }) =>
          expect(message).to.equal(`Client with ${badName} name does not exist`)
        ));

    it('should fail on trying to search user with an undefined name', () =>
      logic
        .searchUserByName(undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));

    it('should fail on trying to search user with an empty name', () =>
      logic
        .searchUserByName('')
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));

    it('should fail on trying to search user with a numeric name', () =>
      logic
        .searchUserByName(123)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));
  });

  describe('search user policies', () => {
    it('search user policies by name', () =>
      logic
        .searchUserPoliciesByName(name)

        .then(res => {
          expect(res.length).to.equal(102);
        }));

    it('should fail on trying to search user policies with bad name', () =>
      logic
        .searchUserPoliciesByName(badName)
        .catch(err => err)
        .then(({ message }) =>
          expect(message).to.equal(`Client with ${badName} name does not exist`)
        ));

    it('should fail on trying to search user policies with an undefined name', () =>
      logic
        .searchUserPoliciesByName(undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));

    it('should fail on trying to search user policies with an empty name', () =>
      logic
        .searchUserPoliciesByName('')
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));

    it('should fail on trying to search user policies with a numeric name', () =>
      logic
        .searchUserPoliciesByName(123)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Name')));
  });

  describe('search policies by client', () => {
    it('search user policies by id', () =>
      logic
        .searchPolicieByUserId(policieId)

        .then(res => {
          expect(res.name).to.equal('Manning');
          expect(res.email).to.equal('manningblankenship@quotezart.com');
        }));

    it('should fail on trying to search user policies with bad id', () =>
      logic
        .searchPolicieByUserId(badId)
        .catch(err => err)
        .then(({ message }) =>
          expect(message).to.equal(`Policie with ${badId} does not exist`)
        ));

    it('should fail on trying to search user policies with an undefined id', () =>
      logic
        .searchPolicieByUserId(undefined)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Policie ID')));

    it('should fail on trying to search user policies with an empty id', () =>
      logic
        .searchPolicieByUserId('')
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Policie ID')));

    it('should fail on trying to search user policies with a numeric id', () =>
      logic
        .searchPolicieByUserId(123)
        .catch(err => err)
        .then(({ message }) => expect(message).to.equal('Invalid Policie ID')));
  });
});
