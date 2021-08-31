const express = require('express');

const PORT = 5000 || process.env.PORT;

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./controller/routesController')(app);


app.listen(PORT)