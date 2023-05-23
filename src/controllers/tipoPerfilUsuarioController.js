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

    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idTipoPerfil = req.body.idTipoPerfil;
        let descricaoPerfil = req.body.descricaoPerfil;
        
        let tipoPerfil = await tipoPerfilUsuarioService.buscarUm(idTipoPerfil);
        if (tipoPerfil) {
            
            res.status(500).json( {
                "data": "1",
                "type": "error",
                "message": `Equipe com código  ${idTipoPerfil} já cadastrada `,
                "detailedMessage": `Equipe com código  ${idTipoPerfil} já cadastrada `
            });
        } else {

            let tipoPerfil = await tipoPerfilUsuarioService.buscarDescricaoEquipe(descricaoPerfil);
            if (tipoPerfil.length > 0) {
                
                for (const i in tipoPerfil) {
                    idTipoPerfil = tipoPerfil[i].idTipoPerfil;
                }
           
                res.status(500).json( {
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descricaoPerfil} para o código de equipe ${idTipoPerfil}`,
                    "detailedMessage": `Já existe a descrição  ${descricaoPerfil} para o código de equipe ${idTipoPerfil}`
                });
            } else {
    
            
                if (idTipoPerfil && descricaoPerfil) {
                await tipoPerfilUsuarioService.inserir(idTipoPerfil, descricaoPerfil);

                    json.items = {
                        idTipoPerfil,
                        descricaoPerfil
                    };

                } else {
                    json.error = 'Campos não enviados';
                }
                res.json(json);
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
