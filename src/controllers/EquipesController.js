const EquipesService = require('../services/EquipesService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        if (req.query.descEquipe) {
            let equipes = await EquipesService.buscarPorDescricaoEquipe(req.query.descEquipe);
            for (let i in equipes) {
                json.items.push({
                    codEquipe: equipes[i].codEquipe,
                    descEquipe: equipes[i].descEquipe
                });
            }
            res.json(json);

        } else {

            if (req.query.codEquipe) {
                let equipes = await EquipesService.buscarPorCodEquipe(req.query.codEquipe);
                for (let i in equipes) {
                    json.items.push({
                        codEquipe: equipes[i].codEquipe,
                        descEquipe: equipes[i].descEquipe
                    });
                }
                res.json(json);
            } else {
                let equipes = await EquipesService.buscarTodos();
                
                for (let i in equipes) {
                    json.items.push({
                        codEquipe: equipes[i].codEquipe,
                        descEquipe: equipes[i].descEquipe
                    });
                }
                res.json(json);
            }
           
        }

    },

    buscarUm: async (req, res) => {
        let json = { error: '', items: {} };
        let codEquipe = req.params.codEquipe;
        let equipes = await EquipesService.buscarUm(codEquipe);
        if (equipes) {
            json.items = equipes;
        }
        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let codEquipe = req.body.codEquipe;
        let descEquipe = req.body.descEquipe;

        let equipes = await EquipesService.buscarUm(codEquipe);
        if (equipes) {

            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": `Equipe com código  ${codEquipe} já cadastrada `,
                "detailedMessage": `Equipe com código  ${codEquipe} já cadastrada `
            });
        } else {

            let equipes = await EquipesService.buscarDescricaoEquipe(descEquipe);
            if (equipes.length > 0) {

                for (const i in equipes) {
                    codEquipe = equipes[i].codEquipe;
                }

                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`,
                    "detailedMessage": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`
                });
            } else {


                if (codEquipe && descEquipe) {
                    await EquipesService.inserir(codEquipe, descEquipe);

                    json.items = {
                        codEquipe,
                        descEquipe
                    };

                } else {
                    json.error = 'Campos não enviados';
                }
                res.json(json);
            }
        }


    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let codEquipe = req.params.codEquipe;
        let descEquipe = req.body.descEquipe;
        let equipes = await EquipesService.buscarDescricaoEquipe(descEquipe);
        if (equipes.length > 0) {

            for (const i in equipes) {
                codEquipe = equipes[i].codEquipe;
            }

            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`,
                "detailedMessage": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`
            });
        } else {
            if (codEquipe && descEquipe) {
                await EquipesService.alterar(codEquipe, descEquipe);
                json.items = {
                    codEquipe,
                    descEquipe
                };
            } else {
                json.error = 'Campos não enviados';
            }
            res.json(json);

        }

    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await EquipesService.excluir(req.params.codEquipe);

        res.json(json);
    }
}
