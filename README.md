# COMP3322 Event Management System Backend

Powered by [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/).

## Prerequisites

You will need [Node.js](https://nodejs.org/en/) v12.16.3 LTS installed on your system.

[Yarn](https://classic.yarnpkg.com/en/) is the recommended package manager.

## Installation

In the server root folder, which should be your current directory (./ems-server), run in terminal:

```
yarn install
```

This will install all neccessary dependencies to run the server.

## Project setup

Again in the server root folder, create a `.env` file (notice the dot at the start) and paste in:

```
PORT=<YOUR_DESIRED_PORT>
SALT_ROUNDS=<YOUR_DESIRED_SALT_ROUNDS>
JWT_SECRET=<YOUR_JWT_SECRET>
MONGO_URI=<YOUR MONGODB CONNECTION STRING>
```

To understand `SALT_ROUNDS` and `JWT_SECRET`, read [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) and [JSON Web Tokens](https://jwt.io/).

For more about MongoDB connection string, read [here](https://docs.mongodb.com/manual/reference/connection-string/).

## Project serve

To start the server, in server root folder, simply run in terminal:
```
yarn start
```

...or with npm:
```
npm run start
```

The server should start at the port specified in `.env`, falling back to `8000` if unspecified.
It can now be accessed via `localhost:8000`.

## Special libraries

As required in specification, here are the list of special libraries included:

### bcrypt.js

>Used for hashing passwords and comparing hashes. See [bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme).

### JSON Web Tokens

>For signing and verifying session tokens. See [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

### ExpressJS Async Errors

>Throw errors easily to express error middleware with async/await syntax. See [express-async-errors](https://github.com/davidbanham/express-async-errors#readme).

### dotenv

>Allows loading environment variables from `.env`. See [dotenv](https://github.com/motdotla/dotenv#readme).

### Helmet

>Helmet helps you secure your Express apps by setting various HTTP headers. See [Helmet](https://github.com/helmetjs/helmet).

