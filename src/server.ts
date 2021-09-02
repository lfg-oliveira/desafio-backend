export const express = require('express');
const {routes} = require('./controller/routesController');

const PORT = 5000 || process.env.PORT;

export const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

routes(app);


app.listen(PORT)