const EquipesService = require('../services/EquipesService');
const EquipeUsuarioService = require('../services/EquipeUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', items: [] };
        if (req.query.descEquipe) {
            let equipes = await EquipesService.buscarPorDescricaoEquipe(req.query.descEquipe);
            for (let i in equipes) {
                let arrayDeObjetos = [];
                if (equipes[i].usuario) {
                    let elementos = equipes[i].usuario.split(',');
                    arrayDeObjetos = elementos.map(elemento => ({ usuario: elemento }));
                }
                json.items.push({
                    codEquipe: equipes[i].codEquipe,
                    descEquipe: equipes[i].descEquipe,
                    detail: arrayDeObjetos
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
                    let arrayDeObjetos = [];
                    if (equipes[i].usuario) {
                        let elementos = equipes[i].usuario.split(',');
                        arrayDeObjetos = elementos.map(elemento => ({ usuario: elemento }));
                    }
                    json.items.push({
                        codEquipe: equipes[i].codEquipe,
                        descEquipe: equipes[i].descEquipe,
                        detail: arrayDeObjetos
                    });
                }
                res.json(json);
            }

        }

    },

    buscarUm: async (req, res) => {
        let json = {};
        let codEquipe = req.params.codEquipe;
        let equipes = await EquipesService.buscarUm(codEquipe);
        if (equipes) {
            json = equipes;
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

                if (descEquipe) {
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
            if (codEquipe != req.params.codEquipe) {
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`,
                    "detailedMessage": `Já existe a descrição  ${descEquipe} para o código de equipe ${codEquipe}`
                });
            } else {

                await EquipesService.alterar(codEquipe, descEquipe);
                json.items = {
                    codEquipe,
                    descEquipe
                };

                res.json(json);
            }

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
        let equipeUsuario = await EquipeUsuarioService.buscarUsuarioEquipe(req.params.codEquipe);

        if (equipeUsuario.length > 0) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Equipe não poderá ser eliminada, possui usuário relacionado à equipe.',
                "detailedMessage": `Existe usuário relacionado à equipe`
            });

        } else {
            await EquipesService.excluir(req.params.codEquipe);
            res.json(json);
        }



    }
}
