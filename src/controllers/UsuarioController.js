const UsuarioService = require('../services/UsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        if (req.query.descUsuario) {
            let equipes = await UsuarioService.buscarPorDescricaoUsuario(req.query.descUsuario);
            for (let i in equipes) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    descUsuario: usuario[i].descUsuario
                });
            }
            res.json(json);
        } else {
            let usuario = await UsuarioService.buscarTodos();
            for (let i in usuario) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    descUsuario: usuario[i].descUsuario    
                });
            }
            res.json(json);
        }
    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);
        if (usuario) {
            json.items = usuario;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let descUsuario = req.body.descUsuario;
        
        let usuario = await UsuarioService.buscarUm(idUsuario);
        if (usuario) {
            
            res.status(500).json( {
                "data": "1",
                "type": "error",
                "message": `Usuario com código  ${idUsuario} já cadastrado `,
                "detailedMessage": `Usuario com código  ${idUsuario} já cadastrado `
            });
        } else {

            let usuario = await UsuarioService.buscarDescricaoUsuario(descUsuario);
            if (usuario.length > 0) {
                
                for (const i in usuario) {
                    idUsuario = usuario[i].idUsuario;
                }
           
                res.status(500).json( {
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descUsuario} para o código de usuario ${idUsuario}`,
                    "detailedMessage": `Já existe a descrição  ${descUsuario} para o código de usuario ${idUsuario}`
                });
            } else {
    
            
                if (idUsuario && descUsuario) {
                await UsuarioService.inserir(idUsuario, descUsuario);

                    json.items = {
                        idUsuario,
                        descUsuario
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

        let idUsuario = req.params.idUsuario;
        let descUsuario = req.body.descUsuario;
        let usuario = await UsuarioService.buscarDescricaoUsuario(descUsuario);
        if (equipes.length > 0) {
            
            for (const i in equipes) {
                idUsuario = usuario[i].idUsuario;
            }
       
            res.status(500).json( {
                "data": "1",
                "type": "error",
                "message": `Já existe a descrição  ${descUsuario} para o código de usuário ${idUsuario}`,
                "detailedMessage": `Já existe a descrição  ${descUsuario} para o código de usuario ${idUsuario}`
            });
        } else {
            if (idUsuario && descUsuario) {
                await UsuarioService.alterar(idUsuario, descUsuario);
                json.items = {
                    idUsuario, 
                    descUsuario
                };
            } else {
                json.error = 'Campos não enviados';
            }
            res.json(json);

        }
        
    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await UsuarioService.excluir(req.params.idUsuario);

        res.json(json);
    }
}
