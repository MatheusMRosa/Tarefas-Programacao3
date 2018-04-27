const express = require('express');

const app = express();

const verificaPrimo = (numero) => {
    for(i=2;i<numero;i++) {   
        if(!(numero%i)) return 0; 
    }
    return 1;
}

app.get("/:id", (req, res) => {
    let valida = verificaPrimo(req.params.id)
    if (valida == 1){
        return res.send("Numero é Primo")
    } else {
        return res.send("Numero não é Primo")
    }   
});

module.exports = app;