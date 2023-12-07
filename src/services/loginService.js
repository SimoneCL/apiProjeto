const hashSenha = require('../hashSenha');
const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM usuario', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (userEmail, senha) => {
        return new Promise((aceito, rejeitado) => {
            senha = hashSenha.gerarSenha(atob(senha));
            db.query('SELECT * FROM usuario ' + 
                    ' inner join perfilusuario ' +
                    ' on perfilusuario.idTipoPerfil = usuario.tipoPerfil ' +
                    ' WHERE email = ? AND senha = ? ', [userEmail, senha], 
                (error, items) => {
                                                
                if (error) { rejeitado(error); return; }
                aceito(items[0]);                
            });
        });
    },  
};