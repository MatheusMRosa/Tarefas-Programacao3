let request = require('request')

request('http://webmathias-com-br.umbler.net/api/cities?seed=2&cities=10', (error, resp, body) => {
    data = JSON.parse(body);
    // console.log(data);
    let aPercorrer = [{
        nome: data.cities[0],
        percorridos: [],
        custo: 0
    }];
    let menorDestino = false;
    let destine = data.cities[0];
    let passo = 0;
    while (aPercorrer.length > 0) {
        // let atual = aPercorrer.pop();
        passo++;
        let atual = aPercorrer[0];
        let filhos = data.roads.filter(c => c.cityA == atual.nome || c.cityB == atual.nome);

        aPercorrer.splice(0, 1);
        // console.log('Tamanho Lista:', aPercorrer.length);
        // console.log('atual:', atual);

        for (let filho of filhos) {

            if (atual.percorridos.find(_filho => _filho == filho.cityA || _filho == filho.cityB)) {

                let tenhaCalmaMathias = filho.cityA === atual.nome ? filho.cityB : filho.cityA

                let _atual = {
                    ...atual,
                    percorridos: [...atual.percorridos, atual.nome],
                    custo: atual.custo + filho.distance
                };

                if (tenhaCalmaMathias == destine && _atual.percorridos.length === data.cities.length) {

                    if (!menorDestino || menorDestino.custo > _atual.custo) {

                        menorDestino = {
                            percorridos: _atual.percorridos,
                            custo: _atual.custo
                        }
                        console.log("Cheguei ao destino Mathias: ", menorDestino);

                    }

                    continue
                }
                // console.log('Não adiciona, já percorreu por:', tenhaCalmaMathias, "Percorrido: ", atual.percorridos.length);
                continue;
            }
            if (menorDestino && atual.custo + filho.distance > menorDestino.custo) {
                // console.log('** - Já tem um caminho mais curto, não olhar mais por aqui: ', filho);
                // continue;
            }
            aPercorrer.push({
                nome: filho.cityA === atual.nome ? filho.cityB : filho.cityA,
                percorridos: [...atual.percorridos, atual.nome],
                custo: atual.custo + filho.distance
            })
        }
    }
    console.log('passos: ', passo);
})

