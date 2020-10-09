const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swagger = require('./documents/document.swagger');
const generateMd = require('./helper/generateMd');
const logger = require('./lib/morgan');
const routes = require('./app/routes');
const { EXPRESS_PORT, EXPRESS_LIMIT } = require('./config/server');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: EXPRESS_LIMIT }));
app.use(bodyParser.urlencoded({ limit: EXPRESS_LIMIT, extended: true }));
app.use(logger);
app.use(swagger);
app.use(routes);

app.listen(EXPRESS_PORT, () => generateMd.apply(app));