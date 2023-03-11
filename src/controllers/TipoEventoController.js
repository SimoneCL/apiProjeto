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
        if (tipoevento) {

            res.status(500).json({
                "codTipo": "1",
                "type": "error",
                "message": `Código ${codTipo} do tipo de evento já cadastrado `,
                "detailedMessage": `Código ${codTipo} do tipo de evento já cadastrado `
            });
        } else {
            let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(descTipoEvento);
            if (tipoEvento) {
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
                if (codTipo && descTipoEvento) {
                    await TipoEventoService.inserir(codTipo, descTipoEvento);

                    json.items = {
                        codTipo,
                        descTipoEvento
                    };

                } else {
                    console.log('res', res.error)
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
        let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(descTipoEvento);
        if (tipoEvento) {
            for (const i in tipoEvento) {
                codTipo = tipoEvento[i].codTipo;
            }
            
            if (codTipo != req.params.codTipo ) {
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

        
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await TipoEventoService.excluir(req.params.codTipo);

        res.json(json);
    }
}
