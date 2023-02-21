const EventoService = require('../services/EventoService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { error: '', items: [] };
        let evento = await EventoService.buscarTodos();
        for (let i in evento) {
            json.items.push({
                user: evento[i].user,
                eventIniDate: evento[i].eventIniDate,
                eventEndDate: evento[i].eventEndDate,
                type: evento[i].type

            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let user = req.params.user;
        let evento = await EventoService.buscarUm(user);
        if (evento) {
            json.items = evento;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let user = req.body.user;
        let eventIniDate = req.body.eventIniDate;
        let eventEndDate = req.body.eventEndDate;
        let type = req.body.type;

        if (user && eventIniDate && eventEndDate && type) {
            await EventoService.inserir(user, eventIniDate, eventEndDate, type);

            json.items = {
                user,
                eventIniDate,
                eventEndDate,
                type
            };

        } else {
            console.log('res', res.error)
            json.error = 'Campos não enviados';
        }
        res.json(json);


    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let user = req.params.user;
        let eventIniDate = req.body.eventIniDate;
        let eventEndDate = req.body.eventEndDate;
        let type = req.body.type;
        if (user && eventIniDate && eventEndDate && type) {
            await EventoService.alterar(user, eventIniDate, eventEndDate, type);
            json.items = {
                user,
                eventIniDate,
                eventEndDate,
                type
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await EventoService.excluir(req.params.user);

        res.json(json);
    }
}
