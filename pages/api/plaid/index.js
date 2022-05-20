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
      "PLAID-CLIENT-ID": '',
      "PLAID-SECRET": '',
      "Plaid-Version": "2020-09-14",
    },
  },
});

//Instantiate the Plaid client with the configuration
export const client = new PlaidApi(config);
