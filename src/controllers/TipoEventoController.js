const TipoEventoService = require('../services/TipoEventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        if (req.query.descTipoEvento) {
            let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(req.query.descTipoEvento);
            for (let i in tipoEvento) {
                json.items.push({
                    codTipo: tipoEvento[i].codTipo,
                    descTipoEvento: tipoEvento[i].descTipoEvento,
                    faixaData: tipoEvento[i].faixaData
                });
            }
            res.json(json);

        } else {
            let tipoEvento = await TipoEventoService.buscarTodos();
            for (let i in tipoEvento) {
                json.items.push({
                    codTipo: tipoEvento[i].codTipo,
                    descTipoEvento: tipoEvento[i].descTipoEvento,
                    faixaData: tipoEvento[i].faixaData
                });
            }
            res.json(json);
        }

    },

    buscarUm: async (req, res) => {
        let json = {};
        let codTipo = req.params.codTipo;
        let tipoevento = await TipoEventoService.buscarUm(codTipo);
        if (tipoevento) {
            json = tipoevento;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let codTipo = req.body.codTipo;
        let descTipoEvento = req.body.descTipoEvento;
        let faixaData = req.body.faixaData

        let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(descTipoEvento);
        if (tipoEvento != false) {
            for (const i in tipoEvento) {
                codTipo = tipoEvento[i].codTipo;
            }

            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": `Já existe a descrição  ${descTipoEvento} para o código de equipe ${codTipo}`,
                "detailedMessage": `Já existe a descrição  ${descTipoEvento} para o código de equipe ${codTipo}`
            });
        } else {
            if (descTipoEvento) {
                await TipoEventoService.inserir(descTipoEvento, faixaData);

                json.items = {
                    codTipo,
                    descTipoEvento,
                    faixaData
                };

            } else {
                json.error = 'Campos não enviados';
            }
            res.json(json);

        }



    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let codTipo = req.params.codTipo;
        let descTipoEvento = req.body.descTipoEvento;
        let faixaData = req.body.faixaData;

        let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(descTipoEvento);
        if (tipoEvento) {
            for (const i in tipoEvento) {
                codTipo = tipoEvento[i].codTipo;
            }

            if (codTipo != req.params.codTipo) {
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descTipoEvento} para o código de equipe ${codTipo}`,
                    "detailedMessage": `Já existe a descrição  ${descTipoEvento} para o código de equipe ${codTipo}`
                });
            } else {
                await TipoEventoService.alterar(codTipo, descTipoEvento, faixaData);
                json.items = {
                    codTipo,
                    descTipoEvento,
                    faixaData
                };
                res.json(json);
            }

        } else {

            if (codTipo && descTipoEvento) {
                await TipoEventoService.alterar(codTipo, descTipoEvento, faixaData);
                json.items = {
                    codTipo,
                    descTipoEvento,
                    faixaData
                };
            } else {
                json.error = 'Campos não enviados';
            }
            res.json(json);
        }
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        let tipoEvento = await TipoEventoService.buscarEventoCodTipo(req.params.codTipo);
        if (tipoEvento.length > 0) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Tipo evento não poderá ser eliminado.',
                "detailedMessage": `Tipo evento não poderá ser eliminado,possui relacionamento com evento de algum usuário.`
            });

        } else {
            await TipoEventoService.excluir(req.params.codTipo);

            res.json(json);
        }
    }
}
