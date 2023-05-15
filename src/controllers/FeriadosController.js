const FeriadosService = require('../services/FeriadosService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        if (req.query.descricao) {
            let feriado = await FeriadosService.buscarPorDescricao(req.query.descricao);
            for (let i in feriado) {
                json.items.push({
                    idFeriado: feriado[i].idFeriado,
                    data: feriado[i].data,
                    descricao: feriado[i].descricao,
                    tipoFeriado: feriado[i].tipoFeriado,
                    pontoFacultativo: feriado[i].pontoFacultativo

                });
            }
            res.json(json);
        } else {
            let feriado = await FeriadosService.buscarTodos();
            for (let i in feriado) {
                json.items.push({
                    idFeriado: feriado[i].idFeriado,
                    data: feriado[i].data,
                    descricao: feriado[i].descricao,
                    tipoFeriado: feriado[i].tipoFeriado,
                    pontoFacultativo: feriado[i].pontoFacultativo

                });
            }
            res.json(json);
        }
    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let data = req.params.data;
        let feriado = await FeriadosService.buscarUm(data);
        if (feriado) {
            json.items = feriado;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let data = req.body.data;
        let descricao = req.body.descricao;
        let tipoFeriado = req.body.tipoFeriado;
        let pontoFacultativo = req.body.pontoFacultativo;
        let feriado = await FeriadosService.buscarUm(data);
        if (feriado) {

            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": `Data  ${data} já cadastrada `,
                "detailedMessage": `Data  ${data} já cadastrada `
            });
        } else {
            feriado = await FeriadosService.buscarDescricaoFeriado(descricao);
            if (feriado.length > 0) {
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descricao} para outra data`,
                    "detailedMessage": `Já existe a descrição  ${descricao} para outra data`
                });
            } else {
                if (data && descricao) {
                    await FeriadosService.inserir(data, descricao, tipoFeriado, pontoFacultativo);

                    json.items = {
                        data,
                        descricao,
                        tipoFeriado,
                        pontoFacultativo
                    };

                } else {
                    json.error = 'Campos não enviados';
                }
                res.json(json);
            }

        }


    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };
        let idFeriado = req.params.idFeriado;
        let data = req.body.data;
        let descricao = req.body.descricao;
        let tipoFeriado = req.body.tipoFeriado;
        let pontoFacultativo = req.body.pontoFacultativo;
        feriado = await FeriadosService.buscarDescricaoFeriado(descricao);
        if (feriado.length > 0) {
            for (const i in feriado) {
                idFeriado = feriado[i].idFeriado;
            }
            if (idFeriado != req.params.idFeriado ) {

                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descricao} para outra data`,
                    "detailedMessage": `Já existe a descrição  ${descricao} para outra data`
                });
            } else {
                if (idFeriado &&data && descricao && tipoFeriado && pontoFacultativo) {
                    await FeriadosService.alterar(idFeriado, data, descricao, tipoFeriado, pontoFacultativo);
                    json.items = {
                        idFeriado,
                        data,
                        descricao,
                        tipoFeriado,
                        pontoFacultativo
                    };
                } else {
                    json.error = 'Campos não enviados';
                }
                res.json(json);
            }
        } else {

            if (idFeriado &&data && descricao && tipoFeriado && pontoFacultativo) {
                await FeriadosService.alterar(idFeriado, data, descricao, tipoFeriado, pontoFacultativo);
                json.items = {
                    idFeriado,
                    data,
                    descricao,
                    tipoFeriado,
                    pontoFacultativo
                };
            } else {
                json.error = 'Campos não enviados';
            }
            res.json(json);
        }
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        await FeriadosService.excluir(req.params.idFeriado);

        res.json(json);
    }
}
