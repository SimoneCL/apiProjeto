const tipoPerfilUsuarioService = require('../services/tipoPerfilUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { items: [] };
        if (req.query.descricaoPerfil) {
            let tipoPerfilUsuario = await tipoPerfilUsuarioService.buscarPorDescricaoPerfil(req.query.descricaoPerfil);
            for (let i in tipoPerfilUsuario) {
                json.items.push({
                    idTipoPerfil: tipoPerfilUsuario[i].idTipoPerfil,
                    descricaoPerfil: tipoPerfilUsuario[i].descricaoPerfil,
                    gestorPessoas: tipoPerfilUsuario[i].gestorPessoas
                });
            }
            res.json(json);
        } else {
            let tipoPerfilUsuario = await tipoPerfilUsuarioService.buscarTodos();
            for (let i in tipoPerfilUsuario) {
                json.items.push({
                    idTipoPerfil: tipoPerfilUsuario[i].idTipoPerfil,
                    descricaoPerfil: tipoPerfilUsuario[i].descricaoPerfil,
                    gestorPessoas: tipoPerfilUsuario[i].gestorPessoas
                });
            }
            res.json(json);
        }
    },

    buscarUm: async (req, res) => {
        let json = {};
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
        let gestorPessoas = req.body.gestorPessoas;

        let tipoPerfil = await tipoPerfilUsuarioService.buscarUm(idTipoPerfil);
        if (tipoPerfil) {

            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": `Tipo perfil com código  ${idTipoPerfil} já cadastrada `,
                "detailedMessage": `Tipo perfil com código  ${idTipoPerfil} já cadastrada `
            });
        } else {

            let tipoPerfil = await tipoPerfilUsuarioService.buscarDescricaoPerfil(descricaoPerfil);
            if (tipoPerfil.length > 0) {

                for (const i in tipoPerfil) {
                    idTipoPerfil = tipoPerfil[i].idTipoPerfil;
                }

                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descricaoPerfil} para o código  ${idTipoPerfil}`,
                    "detailedMessage": `Já existe a descrição  ${descricaoPerfil} para o código ${idTipoPerfil}`
                });
            } else {


                if (descricaoPerfil) {
                    await tipoPerfilUsuarioService.inserir(descricaoPerfil,gestorPessoas);

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
        let gestorPessoas = req.body.gestorPessoas;
        let tipoPerfil = await tipoPerfilUsuarioService.alterar(idTipoPerfil, descricaoPerfil,gestorPessoas);

        if (tipoPerfil.length > 0) {
            json = tipoPerfil;
        }
        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { items: {} };
        let idTipoPerfil = req.params.id;

        let tipoPerfil = await tipoPerfilUsuarioService.buscarPerfilRelacUsuario(idTipoPerfil);
        if (tipoPerfil.length > 0) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Perfil não poderá ser eliminado, possui usuário relacionado ao perfil.',
                "detailedMessage": `Existe usuário relacionado ao perfil`
            });

        } else {
            await tipoPerfilUsuarioService.excluir(req.params.id);
            res.json(json);
        }


    }
}
