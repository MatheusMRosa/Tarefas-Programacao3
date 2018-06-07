let request = require('request')
request('http://webmathias-com-br.umbler.net/api/cities', (error, resp, body) => {
    let data = JSON.stringify(JSON.parse(body), null, '  ');
    console.log(data);
})

let aPercorrer = [inicio]
let menorDestino = {}
while (aPercorrer.length > 0) {
    // let atual = aPercorrer.pop();
    let atual = aPercorrer[0];
    aPercorrer.splice(0,1);
    console.log('Tamanho Lista:', aPercorrer.length);
    // console.log('atual:', atual);

    // 1 - Validar se é o fim
    if (atual.nome == destino) {
        console.log('Chegue por um caminho');
        console.log(atual.percorridos);
        console.log("Custo Total:", atual.custo);
        menorDestino = {
            percorridos: atual.percorridos,
            custo: atual.custo
        }
    }
    // 2 - Adicionar novos caminhos
    let filhos = cidades.find(c => c.nome == atual.nome).filhos;
    for (let f of filhos) {
        if (atual.percorridos.find(f1 => f1 == f.destino)) {
            console.log('Não adiciona, já percorreu por:', f);
            continue;
        }
        if(menorDestino && atual.custo+f.custo > menorDestino.custo){
            console.log('** - Já tem um caminho mais curto, não olhar mais por aqui: '+(atual.custo+f.custo)+ " > "+menorDestino.custo+ ' >> '+atual.nome+' >> '+f.destino);
            continue;
        }
        aPercorrer.push({
            nome: f.destino,
            percorridos: [...atual.percorridos, atual.nome],
            custo: atual.custo + f.custo
        })
    }
}

