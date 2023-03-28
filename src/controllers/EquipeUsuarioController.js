const EquipeUsuarioService = require('../services/EquipeUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };

        if (req.query.usuario) {
            let equipeUsuario = await EquipeUsuarioService.buscarEquipeUsuario(req.query.usuario);
            for (let i in usuario) {
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

    buscarUm: async (req, res) => {
        let json = {} ; // { error: '', items: {} };
        let idUsuario = req.params.id;
        console.log('buscarUm - idUsuario',idUsuario)
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
        let equipeUsuario = await EquipeUsuarioService.buscarCodEquipe(codEquipe); 
        console.log('inserir', equipeUsuario)
        if (idUsuario && codEquipe) {
            await EquipeUsuarioService.inserir(idUsuario, codEquipe);

            json.items = {
                idUsuario,codEquipe
            };
         
        } else {
            console.log('res', res.error)
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },


    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        
        let idUsuario = req.params.id.split(";")[0];
        let codEquipe = req.params.id.split(";")[1];

        await EquipeUsuarioService.excluir(idUsuario,codEquipe);

        res.json(json);
    }
}
