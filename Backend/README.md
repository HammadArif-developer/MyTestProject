
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>
    
### 📚 Description

It is a Nest Js backend application with database, logging, security, and authentication features.

---

### 🚀 Deployment

- Create a `.env` file using the `cp .env.example .env` command and replace the existing env variables with personal settings (MongoDB URL either `srv` or `localhost`)

- Download dependencies using `npm i` or `yarn`

- Start the app in pre-production mode using `npm run start` or `npm run start:dev` for development (the app will be exposed on the port 4000;)

---

### 🔒 Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the `.env` file.

**APP_ENV** - the application environment to execute as, either in development or production. Determines the type of logging options to utilize. Options: `dev` or `prod`. 

**APP_URL** - the base URL for the application. Made mainly to showcase the power of `ConfigService` and can be removed as it doesn't serve any other purpose

**WEBTOKEN_SECRET_KEY** - the secret key to encrypt/decrypt web tokens with. Make sure to generate a random alphanumeric string for this.

**WEBTOKEN_EXPIRATION_TIME** - **the time in seconds** indicating when the web token will expire; by default, it's 2400 seconds which is 40 mins.

**DB_URL** - the URL to the MongoDB collection

---

### ✅ Testing


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

### 💡 TypeDocs

The docs can be generated on-demand, simply, by typing `npm run typedocs`. This will produce a **docs** folder with the required front-end files and **start hosting on [localhost](http://localhost:8080)**.

```bash
# generate docs for code
$ npm run typedocs
```

---

### ✨ Mongoose

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more. Please view the [documentation](https://mongoosejs.com) for further details.

---

### 🔊 Logs

This test project comes with an integrated Winston module for logging, the configurations for Winston can be found in the [app module](https://github.com/msanvarov/nest-rest-mongo-test project/blob/master/src/modules/app/app.module.ts#L27).
