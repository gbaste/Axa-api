## Axa Assessment

Create a Web API for a insurance

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

## EndPoints

### These endpoints do not require admin role

1. GET /company/user/:id

2. GET /company/user?name='NAME'

### These endpoints requires admin role

3. GET /policies/user?name='NAME'

4. GET /policies/:id/user
