
const agrupaEvento = require('../agrupaEvento');
const EventoService = require('../services/EventoService');
const TipoEventoService = require('../services/TipoEventoService');
const UsuarioSubstitutosService = require('../services/UsuarioSubstitutosService')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        let evento;
        if (req.query.codEquipe) {
            evento = await EventoService.buscarEventosEquipeUsuario(req.query.codEquipe, req.query.dataEventoIni, req.query.dataEventoFim);
            let quantityOfDaysSchedule = 0;
            let dataCalc = new Date();
            let primeiroDia = new Date();
            let ultimoDia = new Date();
            let itemsAux = {};
            let newEvent = {};
            let eventos = [];
            let listaSubstituto = [];
            for (let i in evento) {
                let map1 = new Map();
                map1.set('idUsuario', evento[i].idUsuario);
                primeiroDia = new Date(evento[i].dataEventoIni);

                const end = new Date(evento[i].dataEventoFim);
                ultimoDia = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1)

                quantityOfDaysSchedule = Math.floor(
                    (Date.UTC(ultimoDia.getFullYear(), ultimoDia.getMonth(), ultimoDia.getDate()) -
                        Date.UTC(primeiroDia.getFullYear(), primeiroDia.getMonth(), primeiroDia.getDate())) /
                    (1000 * 60 * 60 * 24)
                );
                dataCalc = new Date();

                for (let y = 0; y <= quantityOfDaysSchedule; y++) {
                    dataCalc = new Date(primeiroDia.getFullYear(), primeiroDia.getMonth(), (primeiroDia.getDate()) + y);

                    map1.set(agrupaEvento.formatoProperty(dataCalc), evento[i].descTipoEvento);


                    itemsAux = [...map1];
                    if (newEvent[itemsAux[0][0]] !== itemsAux[0][1]) {
                        newEvent = {};
                    }
                    if (itemsAux[y][1] !== null) {
                        newEvent[itemsAux[0][0]] = itemsAux[0][1];
                        newEvent[itemsAux[y][0]] = itemsAux[y][1];
                    }
                    newEvent['nomeUsuario'] = evento[i].nomeUsuario;
                }
                eventos.push(newEvent);
            }
            agrupado = agrupaEvento.agrupByUser(eventos);

            for (let a in agrupado) {
                let substitutos = await UsuarioSubstitutosService.buscarUsuarioSubstitutos(agrupado[a].idUsuario);
                listaSubstituto = [];
                for (let s in substitutos) {
                    if (substitutos[s].usuario_id === agrupado[a].idUsuario) {
                        listaSubstituto[s] = { usuarioSubstituto: substitutos[s].nomeUsuario };
                    }
                }
                agrupado[a].detail = listaSubstituto;

            }


            json.items = agrupado;
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
