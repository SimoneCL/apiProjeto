const TipoEventoService = require('../services/TipoEventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        if(req.query.descTipoEvento) {
            let tipoEvento = await TipoEventoService.buscarPorDescTipoEvento(req.query.descTipoEvento);
            for (let i in tipoEvento) {
                json.items.push({
                    code: tipoEvento[i].code,
                    descTipoEvento: tipoEvento[i].descTipoEvento
                });
            }
            res.json(json);

        } else {
            let tipoEvento = await TipoEventoService.buscarTodos();
            for (let i in tipoEvento) {
                json.items.push({
                    code: tipoEvento[i].code,
                    descTipoEvento: tipoEvento[i].descTipoEvento
                });
            }
            res.json(json);
        }
       
    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let code = req.params.code;
        let tipoevento = await TipoEventoService.buscarUm(code);
        if (tipoevento) {
            json.items = tipoevento;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let code = req.body.code;
        let descTipoEvento = req.body.descTipoEvento;
        let tipoevento = await TipoEventoService.buscarUm(code);
        if (tipoevento) {
            
            res.status(500).json( {
                "code": "1",
                "type": "error",
                "message": `Código ${code} do tipo de evento já cadastrado `,
                "detailedMessage": `Código ${code} do tipo de evento já cadastrado `
            });
        } else {
            if (code && descTipoEvento) {
               await TipoEventoService.inserir(code, descTipoEvento);

                json.items = {
                    code,
                    descTipoEvento
                };

            } else {
                console.log('res', res.error)
                json.error = 'Campos não enviados';
            }
            res.json(json);
        }
       

    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let code = req.params.code;
        let descTipoEvento = req.body.descTipoEvento;

        if (code && descTipoEvento) {
            await TipoEventoService.alterar(code, descTipoEvento,);
            json.items = {
                code,
                descTipoEvento
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await TipoEventoService.excluir(req.params.code);

        res.json(json);
    }
}
