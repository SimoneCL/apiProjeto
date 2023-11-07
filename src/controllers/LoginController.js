const hashSenha = require('../hashSenha');
const loginService = require('../services/loginService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { items: [] };
        let users = await loginService.buscarTodos();
        for (let i in users) {
            json.items.push({
                idUsuario: users[i].idUsuario,
                usuario: users[i].usuario,
                email: users[i].email,
                tipoPerfil: users[i].tipoPerfil,
                senha: users[i].senha
            });
        }
        res.json(json);
    },
    buscarUm: async (req, res) => {
        let json = { };
        let userEmail = req.params.user;
        let senha = req.params.senha;     
        let users = await loginService.buscarUm(userEmail, senha);
        if (users) {
            json = users;
        }
        res.json(json);
    },    
}
