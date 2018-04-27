const express = require('express');
const cliente = require('../entities/documentoCliente');

const app = express();

app.get("", (req, res) => {
    var filtro = req.query.filtro
    obj = {}
    if (filtro) {
        obj = {nome: filtro}
    } else {
        obj = { }
    }
    cliente.find(obj, { _id: true, nome: true }, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.get("/:id", (req, res) => {
    cliente.findById(req.params.id, {}, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        res.json(data || [])
    })
});

app.put("", (req, res) => {
    let _new = new cliente(req.body);
    if (!/99999-999/.test(_new.cep)) {
        return res.status(502).send("Erro de Autenticação de CEP")
    } else if (!_new.cpf && !_new.cnpj){
        return res.status(502).send("Valores não podem ser nulos: CPF ou Cnpj")
    }else{
        _new.save((err, saved) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(saved)
        })
    }
});

app.delete("/:id", (req, res) => {
    cliente.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

app.post("/:id", (req, res) => {
    cliente.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
});

module.exports = app;