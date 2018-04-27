const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cliente = require('./api/documentoCliente');
const primo = require('./api/primo');
const lista = require('./api/listacircular');
 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/client/', cliente);

app.use('/primo', primo)

app.use('/add', lista)


app.listen(3030, '0.0.0.0', () => {

        console.log('He is alive');
        // mongoose.connect('mongodb://localhost/test');


});