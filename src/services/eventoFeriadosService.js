const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM eventoferiados', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarIdFeriado: (idFeriado) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM eventoferiados WHERE idFeriado = ?', [idFeriado], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
              
            });
        });

    },
    buscarUsuarioEquipe: (idEvento) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM eventoferiados WHERE idEvento in (${idEvento})`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    },

    buscaridEvento: (idEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM eventoferiados WHERE idEvento = ?', [idEvento], (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (idFeriado, idEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO eventoferiados (idFeriado,  idEvento) VALUES (?,?)',
                [idFeriado, idEvento],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },



    excluir: (idFeriado, idEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM eventoferiados WHERE idFeriado = ? and idEvento = ?', [idFeriado, idEvento], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};