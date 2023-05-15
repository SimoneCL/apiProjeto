const UsuarioService = require('../services/UsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
    
        if (req.query.usuario) {
            let usuario = await UsuarioService.buscarPorDescricaoEquipe(req.query.usuario);
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
    },

    buscarUm: async (req, res) => {
        let json = {}; //{ error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);
        if (usuario) {
            json = usuario;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let nomeUsuario = req.body.usuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        let senha = req.body.senha;
        if (idUsuario && nomeUsuario && email && tipoPerfil) {
            await UsuarioService.inserir(idUsuario, nomeUsuario, email, tipoPerfil, senha);

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
        let nomeUsuario = req.body.usuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        let senha = req.body.senha;
        if (idUsuario && nomeUsuario && email && tipoPerfil) {
            await UsuarioService.alterar(idUsuario, nomeUsuario,email, tipoPerfil, senha);
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

    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        
        await UsuarioService.excluir(req.params.idUsuario);

        res.json(json);
    }
}
