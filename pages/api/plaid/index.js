// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const session = require("express-session");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
// const app = express();

// app.use(
//   // FOR DEMO PURPOSES ONLY
//   // Use an actual secret key in production
//   session({ secret: "bosco", saveUninitialized: true, resave: true })
// );

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments['sandbox'],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": '6286ba0b827c8b001836fc3e',
      "PLAID-SECRET": 'ebabc602bcf26468ad542bb5a9b1f5',
      "Plaid-Version": "2020-09-14",
    },
  },
});

//Instantiate the Plaid client with the configuration
export const client = new PlaidApi(config);
