const express = require('express');

const app = express();

var lista = [];
var limite = 10;

const addLista = (item) => {
    if (lista.length == limite){
        lista.splice(0,1)
        lista.push(item)
    }else if (lista.length > limite){
        lista.slice(limite -1, lista.length -1)
    }else {
        lista.push(item)
    }
}


app.get("/:id", (req, res) => {
    addLista(req.params.id)
    return res.send("Adicionado")
});

app.get("/", (req, res) => {
    return res.json(lista)
});

app.get("/limit/:id", (req, res) => {
    limite = req.params.id
    if (lista.length > limite){
        lista.slice(limite -1, lista.length -1)
    }
    return res.json(lista)
});

module.exports = app;