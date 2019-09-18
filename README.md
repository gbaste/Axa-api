# Axa Assessment

## Create a Web API for an insurance company

1. Get user data filtered by user id
2. Get user data filtered by user name
3. Get the list of policies linked to a user name
4. Get the user linked to a policy number

## Getting started

1. Clone the repo

```
$ git clone https://github.com/gbaste/Axa-api.git
$ cd Axa-api
```

2. Install dependencies

```
$ npm install
```

3. Set environment variable in .env (port)

4. Start backend development server

```
$ npm start
```
5. Watch mode

```
$ npm run watch
```

## Test with Jest

1. Run test

```
$ npm test
```

2. Run test coverage

```
$ npm run coverage
```
## EndPoints

### Authenticate user

1. POST /api/auth

```
{
	"email": "manningblankenship@quotezart.com",
	"password": "Axa123"
}
```
### These endpoints do not require admin role

1. GET /api/company/user/:id

2. GET /api/company/user?name='NAME'

### These endpoints requires admin role

3. GET /api/policies/user?name='NAME'

4. GET /api/policies/:id/user
