const EquipeUsuarioService = require('../services/EquipeUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        if (req.query.idUsuario) {
            let equipeUsuario = await EquipeUsuarioService.buscarEquipesUsuario(req.query.idUsuario);
            for (let i in equipeUsuario) {
                json.items.push({
                    idUsuario: equipeUsuario[i].idUsuario,
                    codEquipe: equipeUsuario[i].codEquipe
                });
            }
            res.json(json);
        } else {
            let equipeUsuario = await EquipeUsuarioService.buscarTodos();
            for (let i in equipeUsuario) {
                json.items.push({
                    idUsuario: equipeUsuario[i].idUsuario,
                    codEquipe: equipeUsuario[i].codEquipe
                });
            }
            res.json(json);
        }
    },
    buscarUsuarioEquipe: async (req, res) => {

        let json = { error: '', items: [] };
        let equipeUsuario = await EquipeUsuarioService.buscarUsuarioEquipe(req.query.codEquipe);
        for (let i in equipeUsuario) {
            json.items.push({
                idUsuario: equipeUsuario[i].idUsuario,
                codEquipe: equipeUsuario[i].codEquipe
            });
        }
        res.json(json);
    },
    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.id;
        let equipeUsuario = await EquipeUsuarioService.buscarEquipesUsuario(idUsuario);
        if (equipeUsuario) {
            json = equipeUsuario;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let codEquipe = req.body.codEquipe;
        if (idUsuario && codEquipe) {
            await EquipeUsuarioService.inserir(idUsuario, codEquipe);

            json.items = {
                idUsuario,codEquipe
            };
         
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },


    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        let idUsuario = req.params.id.split("|")[0];
        let codEquipe = req.params.id.split("|")[1];
        await EquipeUsuarioService.excluir(idUsuario, codEquipe);

        res.json(json);
    }
}
