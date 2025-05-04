const express = require("express");
const app = express();
const mainRouter = require('./routes/index');
const cors = require('cors');
const { connect } = require('./db');
require('dotenv').config();

app.use(cors());
app.use(express.json());

connect();

app.use('/api/v1', mainRouter);

app.listen(3000);