const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { PORT } = process.env;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(cors());
app.use(express.json());

//API Routes//
const services = require('./services');
app.use('/api', services);

// views
app.use(express.static('views'));


app.listen(port = PORT||3000, () => {
  console.log(`server started listening on port ${port}.`);
})