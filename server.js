const express = require('express');
const server = express();

const actionRouter = require('./data/helpers/actionRouter.js');
const projectRouter = require('./data/helpers/projectRouter');


server.use(express.json());

 server.use('/action', actionRouter);
 server.use('/project', projectRouter);

module.exports = server;