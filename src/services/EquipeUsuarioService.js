const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM equipeUsuario', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarEquipesUsuario: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM equipeUsuario WHERE idUsuario = ?', [idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
              
            });
        });

    },
    buscarUsuarioEquipe: (codEquipe) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM equipeUsuario WHERE codEquipe in (${codEquipe})`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    },

    buscarCodEquipe: (codEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM equipeUsuario WHERE codEquipe = ?', [codEquipe], (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (idUsuario, codEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO equipeUsuario (idUsuario,  codEquipe) VALUES (?,?)',
                [idUsuario, codEquipe],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },



    excluir: (idUsuario, codEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM equipeUsuario WHERE idUsuario = ? and codEquipe = ?', [idUsuario, codEquipe], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};