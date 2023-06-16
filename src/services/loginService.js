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

    buscarUm: (userEmail) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuario WHERE email = ?', [userEmail], 
                (error, items) => {
                
                if (error) { rejeitado(error); return; }
                aceito(items[0]);                
            });
        });
    },  
};