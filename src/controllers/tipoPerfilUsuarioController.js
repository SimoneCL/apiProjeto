const tipoPerfilUsuarioService = require('../services/tipoPerfilUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { items: [] };
        if (req.query.descricaoPerfil) {
            let tipoPerfilUsuario = await tipoPerfilUsuarioService.buscarPorDescricaoEquipe(req.query.descricaoPerfil);
            for (let i in tipoPerfilUsuario) {
                json.items.push({
                    idTipoPerfil: tipoPerfilUsuario[i].idTipoPerfil,
                    descricaoPerfil: tipoPerfilUsuario[i].descricaoPerfil,
                    gestor: tipoPerfilUsuario[i].gestor
                });
            }
            res.json(json);
        } else {
            let tipoPerfilUsuario = await tipoPerfilUsuarioService.buscarTodos();
            for (let i in tipoPerfilUsuario) {
                json.items.push({
                    idTipoPerfil: tipoPerfilUsuario[i].idTipoPerfil,
                    descricaoPerfil: tipoPerfilUsuario[i].descricaoPerfil,
                    gestor: tipoPerfilUsuario[i].gestor
                });
            }
            res.json(json);
        }
    },

    buscarUm: async (req, res) => {
        let json = { };
        let idTipoPerfil = req.params.id;
        let tipoPerfilUsuarios = await tipoPerfilUsuarioService.buscarUm(idTipoPerfil);        
        if (tipoPerfilUsuarios) {
            json = tipoPerfilUsuarios;
        }
        res.json(json);        
    },

    buscarDescTipoPerfil: async (req, res) => {
        let json = { };
        let descricaoPerfil = req.body.descricaoPerfil;
        let tipoPerfilUsuarios = await tipoPerfilUsuarioService.buscarDescTipoPerfil(descricaoPerfil);        
        if (tipoPerfilUsuarios) {
            json = tipoPerfilUsuarios;
        }
        res.json(json);        
    },

    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let descricaoPerfil = req.body.descricaoPerfil;
        
        let descPerfilUsuario = await tipoPerfilUsuarioService.buscarDescTipoPerfil(descricaoPerfil);
        if (descPerfilUsuario) {
            
            res.status(500).json( {
                "data": "1",
                "type": "error",
                "message": `Tipo perfil já foi cadastrado`,
                "detailedMessage": `Tipo perfil ${descricaoPerfil} já cadastrado.`
            });

        } else {            
            if (descricaoPerfil) {
                await tipoPerfilUsuarioService.inserir(descricaoPerfil);

                json.items = {
                    descricaoPerfil
                };

                res.json(json);

            } else {
                res.status(500).json( {
                    "data": "1",
                    "type": "error",
                    "message": `Tipo perfil em branco`,
                    "detailedMessage": `Tipo perfil não pode ser em branco.`
                });
            }                        
        }
    },

    alterar: async (req, res) => {
        let json = { items: {} };
        
        let idTipoPerfil = req.body.idTipoPerfil;
        let descricaoPerfil = req.body.descricaoPerfil;
        let tipoPerfil = await tipoPerfilUsuarioService.alterar(idTipoPerfil,descricaoPerfil);
        
        if (tipoPerfil.length > 0) {
            json = tipoPerfil;            
        }
        res.json(json);        
    },

    excluir: async (req, res) => {
        let json = { items: {} };
        await tipoPerfilUsuarioService.excluir(req.params.id);

        res.json(json);
    }
}
