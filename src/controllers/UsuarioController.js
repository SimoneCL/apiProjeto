const UsuarioService = require('../services/UsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { items: [], error: '' };
        if (req.query.nomeUsuario) {
            let usuario = await UsuarioService.buscarPorNomeUsuario(req.query.nomeUsuario);
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
            if(req.query.idUsuario){
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
                    json.items.push({
                        idUsuario: usuario[i].idUsuario,
                        nomeUsuario: usuario[i].nomeUsuario,
                        email: usuario[i].email,
                        tipoPerfil: usuario[i].tipoPerfil,
                        senha: usuario[i].senha
                    });
                }
                res.json(json);
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
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        let senha = req.body.senha;
        if (nomeUsuario && email && tipoPerfil) {
            await UsuarioService.inserir(nomeUsuario, email, tipoPerfil, senha);

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
        let senha = req.body.senha;

        if (idUsuario && senha) {
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

        await UsuarioService.excluir(req.params.idUsuario);

        res.json(json);
    }
}
