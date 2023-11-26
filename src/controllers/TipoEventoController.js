const TipoEventoService = require('../services/TipoEventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        if (req.query.descTipoEvento) {
            let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(req.query.descTipoEvento);
            for (let i in tipoEvento) {
                json.items.push({
                    codTipo: tipoEvento[i].codTipo,
                    descTipoEvento: tipoEvento[i].descTipoEvento
                });
            }
            res.json(json);

        } else {
            let tipoEvento = await TipoEventoService.buscarTodos();
            for (let i in tipoEvento) {
                json.items.push({
                    codTipo: tipoEvento[i].codTipo,
                    descTipoEvento: tipoEvento[i].descTipoEvento
                });
            }
            res.json(json);
        }

    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let codTipo = req.params.codTipo;
        let tipoevento = await TipoEventoService.buscarUm(codTipo);
        if (tipoevento) {
            json.items = tipoevento;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let codTipo = req.body.codTipo;
        let descTipoEvento = req.body.descTipoEvento;
        let tipoevento = await TipoEventoService.buscarUm(codTipo);

        if (tipoevento != false) {

            res.status(500).json({
                "codTipo": "1",
                "type": "error",
                "message": `Código ${codTipo} do tipo de evento já cadastrado `,
                "detailedMessage": `Código ${codTipo} do tipo de evento já cadastrado `
            });
        } else {
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
                    await TipoEventoService.inserir(codTipo, descTipoEvento);

                    json.items = {
                        codTipo,
                        descTipoEvento
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

        let codTipo = req.params.codTipo;
        let descTipoEvento = req.body.descTipoEvento;
        if (req.params.codTipo == 1 || req.params.codTipo == 2 || req.params.codTipo == 3 || req.params.codTipo == 4) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Tipo evento obrigatório.',
                "detailedMessage": `Tipo evento obrigatório e não pode ser alterado.`
            });
        } else {

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
                    await TipoEventoService.alterar(codTipo, descTipoEvento,);
                    json.items = {
                        codTipo,
                        descTipoEvento
                    };
                    res.json(json);
                }

            } else {

                if (codTipo && descTipoEvento) {
                    await TipoEventoService.alterar(codTipo, descTipoEvento,);
                    json.items = {
                        codTipo,
                        descTipoEvento
                    };
                } else {
                    json.error = 'Campos não enviados';
                }
                res.json(json);
            }

        }



    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        console.log(' req.params.codTipo', req.params.codTipo)
        if (req.params.codTipo == 1 || req.params.codTipo == 2 || req.params.codTipo == 3 || req.params.codTipo == 4) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Tipo evento obrigatório.',
                "detailedMessage": `Tipo evento obrigatório e não pode ser eliminado.`
            });
        } else {
            let tipoEvento = await TipoEventoService.buscarEventoCodTipo(req.params.codTipo);
            if (tipoEvento.length > 0) {
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": 'Tipo evento não poderá ser eliminado, existe evento relacionado.',
                    "detailedMessage": `Tipo evento não poderá ser eliminado,existe evento relacionado.`
                });

            } else {
                await TipoEventoService.excluir(req.params.codTipo);

                res.json(json);
            }

        }



    }
}
