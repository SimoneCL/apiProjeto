const EventoService = require('../services/EventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        let evento = await EventoService.buscarTodos();
        for (let i in evento) {
            json.items.push({
                idUsuario: evento[i].idUsuario,
                dataEventoIni: evento[i].dataEventoIni,
                dataEventoFim: evento[i].dataEventoFim,
                codTipo: evento[i].codTipo

            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let evento = await EventoService.buscarUm(idUsuario);
        if (evento) {
            json = evento;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let dataEventoIni = req.body.dataEventoIni;
        let dataEventoFim = req.body.dataEventoFim;
        let codTipo = req.body.codTipo;
console.log('inserir - idUsuario', idUsuario, 'dataEventoIni', dataEventoIni, 'dataEventoFim', dataEventoFim ,'codTipo', codTipo)
        if (idUsuario && dataEventoIni && dataEventoFim && codTipo) {
            await EventoService.inserir(idUsuario, dataEventoIni, dataEventoFim, codTipo);

            json.items = {
                idUsuario,
                dataEventoIni,
                dataEventoFim,
                codTipo
            };

        } else {
            console.log('res', res.error)
            json.error = 'Campos não enviados';
        }
        res.json(json);


    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let idUsuario = req.params.idUsuario;
        let dataEventoIni = req.body.dataEventoIni;
        let dataEventoFim = req.body.dataEventoFim;
        let codTipo = req.body.codTipo;
        if (idUsuario && dataEventoIni && dataEventoFim && codTipo) {
            await EventoService.alterar(idUsuario, dataEventoIni, dataEventoFim, codTipo);
            json.items = {
                idUsuario,
                dataEventoIni,
                dataEventoFim,
                codTipo
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await EventoService.excluir(req.params.idUsuario);

        res.json(json);
    }
}
