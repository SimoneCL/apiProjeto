const UsuarioService = require('../services/UsuarioService');
const TipoEventoService = require('../services/TipoEventoService');
const FeriadosService = require('../services/FeriadosService');
const EventoService = require('../services/EventoService');
const EquipesService = require('../services/EquipesService');
const EquipeUsuarioService = require('../services/EquipeUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { items: [], error: '' };
        let detail = [];
        if (req.query.codEquipe && req.query.nomeUsuario) {

            let usuario = await UsuarioService.buscarUsuariodaEquipe(req.query.codEquipe, req.query.nomeUsuario);
            for (let i in usuario) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    nomeUsuario: usuario[i].nomeUsuario,
                    email: usuario[i].email,
                    tipoPerfil: usuario[i].tipoPerfil,
                    senha: usuario[i].senha
                });
            }
            res.json(json);
        } else {

            if (req.query.nomeUsuario) {
                let usuario = await UsuarioService.buscarPorNomeUsuario(req.query.nomeUsuario);
                for (let i in usuario) {
                    
                    let arrayDeObjetos = [];
                    if (usuario[i].equipes) {
                        let elementos = usuario[i].equipes.split(',');
                        arrayDeObjetos = elementos.map(elemento => ({ equipe: elemento }));
                    }
                    json.items.push({
                        idUsuario: usuario[i].idUsuario,
                        nomeUsuario: usuario[i].nomeUsuario,
                        email: usuario[i].email,
                        tipoPerfil: usuario[i].tipoPerfil,
                        senha: usuario[i].senha,
                        detail: arrayDeObjetos
                    });
                }
                res.json(json);
            } else {
                if (req.query.idUsuario) {
                    let usuario = await UsuarioService.buscarUm(req.query.idUsuario);
                    if (usuario) {

                        for (let i in usuario) {
                            json.items.push({
                                idUsuario: usuario[i].idUsuario,
                                nomeUsuario: usuario[i].nomeUsuario,
                                email: usuario[i].email,
                                tipoPerfil: usuario[i].tipoPerfil,
                                senha: usuario[i].senha
                            });
                        }
                    }

                    res.json(json);
                }
                else {
                    let usuario = await UsuarioService.buscarTodos();

                    for (let i in usuario) {

                        let arrayDeObjetos = [];
                        if (usuario[i].equipes) {
                            let elementos = usuario[i].equipes.split(',');
                            arrayDeObjetos = elementos.map(elemento => ({ equipe: elemento }));
                        }

                        json.items.push({
                            idUsuario: usuario[i].idUsuario,
                            nomeUsuario: usuario[i].nomeUsuario,
                            email: usuario[i].email,
                            tipoPerfil: usuario[i].tipoPerfil,
                            senha: usuario[i].senha,
                            detail: arrayDeObjetos
                        });



                    }
                    res.json(json);
                }
            }
        }

    },

    buscarUm: async (req, res) => {

        let json = {};
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);

        if (usuario) {
            json = usuario;
        }
        res.json(json);
    },

    comparaSenha: async (req, res) => {
        let json = {}; //{ error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let senhaUsuario = atob(req.params.senha); 
        let usuario = await UsuarioService.comparaSenha(idUsuario,senhaUsuario);
        if (usuario) {
            json = usuario;
        }
        res.json(json);
    },

    buscarUsuariolookup: async (req, res) => {

        let json = { error: '', items: [] };
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);

        if (usuario) {

            for (let i in usuario) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    nomeUsuario: usuario[i].nomeUsuario,
                    email: usuario[i].email,
                    tipoPerfil: usuario[i].tipoPerfil,
                    senha: usuario[i].senha
                });
            }
        }

        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let idUsuarioAux = req.body.idUsuario;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        let senha = req.body.senha;
        if (nomeUsuario && email && tipoPerfil) {
            await UsuarioService.inserir(nomeUsuario, email, tipoPerfil, senha);
            let usuario = await UsuarioService.buscarUsuarioPorEmail(email);
            for (let i in usuario) {
                idUsuarioAux = usuario[i].idUsuario;
            }
            if (idUsuarioAux) {
                let feriado = await FeriadosService.buscarTodos();
                let codTipo = 0;

                let tipoEvento = await TipoEventoService.buscarTodos();

                for (let i in tipoEvento) {
                    if (tipoEvento[i].descTipoEvento === 'feriado') {
                        codTipo = tipoEvento[i].codTipo;
                    }
                }

                if (codTipo) {
                    for (let i in feriado) {
                        await EventoService.inserir(idUsuarioAux, feriado[i].data, feriado[i].data, codTipo);
                    }
                }
            }

            json.items = {
                idUsuario,
                nomeUsuario,
                email,
                tipoPerfil,
                senha
            };

        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let idUsuario = req.params.idUsuario;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;

        if (idUsuario && nomeUsuario && email && tipoPerfil) {
            await UsuarioService.alterar(idUsuario, nomeUsuario, email, tipoPerfil);
            json.items = {
                idUsuario,
                nomeUsuario,
                email,
                tipoPerfil
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },
    alterarSenha: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let senha = req.params.senha;
        //let senha = atob(req.params.senha);
        if (idUsuario) {
            await UsuarioService.alterarSenha(idUsuario, senha);
            json.items = {
                idUsuario,
                senha
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        let equipeUsuario = await EquipeUsuarioService.buscarEquipesUsuario(req.params.idUsuario);
        if (equipeUsuario.length > 0 ) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Usuário não poderá ser eliminado.',
                "detailedMessage": 'A exclusão do usuário não será possível devido ao relacionamento com uma equipe.'
            });

        } else {
            await EventoService.excluirEventoDoUsuario(req.params.idUsuario);
            await UsuarioService.excluir(req.params.idUsuario);

            res.json(json);
        }
    }
}
