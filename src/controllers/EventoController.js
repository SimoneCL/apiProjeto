const EventoService = require('../services/EventoService');
const TipoEventoService = require('../services/TipoEventoService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        let evento;
        if (req.query.codEquipe) {
            evento = await EventoService.buscarEventosEquipeUsuario(req.query.codEquipe, req.query.dataEventoIni, req.query.dataEventoFim);

            for (let i in evento) {
                json.items.push({
                    idUsuario: evento[i].idUsuario,
                    nomeUsuario: evento[i].nomeUsuario,
                    codEquipe: evento[i].codEquipe,
                    descEquipe: evento[i].descEquipe,
                    dataEventoIni: evento[i].dataEventoIni,
                    dataEventoFim: evento[i].dataEventoFim,
                    codTipo: evento[i].codTipo,
                    descTipoEvento: evento[i].descTipoEvento,
                    usuarioSubstituto: evento[i].usuarioSubstituto
                });
            }
        } else {
            if (req.query.idUsuario) {
                let descricao = req.query.descricao;
                let codTipo = '';
                if (req.query.codTipo === undefined) {

                    let tipoEvento = await TipoEventoService.buscarTodos();
                    for (let i in tipoEvento) {
                        if (codTipo === '') {
                            codTipo = tipoEvento[i].codTipo;
                        } else {
                            codTipo = codTipo + ',' + tipoEvento[i].codTipo;
                        }
                    }

                } else {
                    codTipo = req.query.codTipo.toString();
                }
                let evento = await EventoService.buscarPorIdUsuario(req.query.idUsuario, req.query.dataInicial, req.query.dataFinal, descricao, codTipo);
                if (evento) {
                    for (let i in evento) {
                        json.items.push({
                            idEvento: evento[i].idEvento,
                            idUsuario: evento[i].idUsuario,
                            dataEventoIni: evento[i].dataEventoIni,
                            dataEventoFim: evento[i].dataEventoFim,
                            codTipo: evento[i].codTipo,
                            descricao: evento[i].descricao,
                            usuarioSubstituto: evento[i].usuarioSubstituto


                        });

                    }
                }

            } else {
                evento = await EventoService.buscarTodos();

                for (let i in evento) {
                    json.items.push({
                        idEvento: evento[i].idEvento,
                        idUsuario: evento[i].idUsuario,
                        dataEventoIni: evento[i].dataEventoIni,
                        dataEventoFim: evento[i].dataEventoFim,
                        codTipo: evento[i].codTipo

                    });
                }
            }

        }

        res.json(json);
    },
    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let idEvento = req.params.idEvento;
        let evento = await EventoService.buscarUm(idEvento);

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


        if (idUsuario && dataEventoIni && dataEventoFim && codTipo) {
            let evento = await EventoService.buscarPorDataExata(idUsuario, dataEventoIni, dataEventoFim);
            if (evento.length > 0) {
                res.status(500).json({
                    "codTipo": "1",
                    "type": "error",
                    "message": `Usuário já possui evento nesse período`,
                    "detailedMessage": `Usuário já possui evento cadastrado nesse período, não será possível inserir este evento`
                });

            } else {

                await EventoService.inserir(idUsuario, dataEventoIni, dataEventoFim, codTipo);

                json.items = {
                    idUsuario,
                    dataEventoIni,
                    dataEventoFim,
                    codTipo
                };
                res.json(json);
            }



        } else {
            json.error = 'Campos não enviados';
            res.json(json);
        }
      


    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let idEvento = req.params.idEvento
        let idUsuario = req.body.idUsuario;
        let dataEventoIni = req.body.dataEventoIni;
        let dataEventoFim = req.body.dataEventoFim;
        let codTipo = req.body.codTipo;
        if (idEvento && idUsuario && dataEventoIni && dataEventoFim && codTipo) {
            await EventoService.alterar(idEvento, idUsuario, dataEventoIni, dataEventoFim, codTipo);
            json.items = {
                idEvento,
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
        let idEvento = req.params.id.split(";")[0];
        let idUsuario = req.params.id.split(";")[1];
        if (idEvento && idUsuario) {
            await EventoService.excluir(idEvento, idUsuario);
        }

        res.json(json);
    }

}
