const TipoEventoService = require('../services/TipoEventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        let tipoEvento = await TipoEventoService.buscarTodos();
        // console.log('buscarTodos - tipoEvento',tipoEvento)
        for (let i in tipoEvento) {
            json.items.push({
                code: tipoEvento[i].code,
                descTipoEvento: tipoEvento[i].descTipoEvento
            });
        }
        res.json(json);
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

        if (code && descTipoEvento) {
            let codigoTipoEvento = await TipoEventoService.inserir(code, descTipoEvento);

            json.items = {
                code,
                descTipoEvento
            };

        } else {
            console.log('res', res.error)
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },

    alterar: async (req, res) => {
        console.log('alterar')
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
