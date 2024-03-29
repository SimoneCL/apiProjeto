const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query(` SELECT equipes.* , GROUP_CONCAT(usuario.nomeUsuario) AS usuario
                        FROM equipes
                        left JOIN equipeUsuario
                        ON equipeUsuario.codEquipe = equipes.codEquipe
                        left join usuario
                        on usuario.idUsuario = equipeusuario.idUsuario
                        GROUP BY equipes.codEquipe
                        ORDER BY equipes.descEquipe`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });

        });
    },
    buscarPorCodEquipe: (codEquipe) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM equipes WHERE codEquipe in (${codEquipe})`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPorDescricaoEquipe: (descEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query(` SELECT equipes.* , GROUP_CONCAT(usuario.nomeUsuario) AS usuario
                        FROM equipes
                        left JOIN equipeUsuario
                        ON equipeUsuario.codEquipe = equipes.codEquipe
                        left join usuario
                        on usuario.idUsuario = equipeusuario.idUsuario
                        where equipes.descEquipe like '%${descEquipe}%'
                        GROUP BY equipes.codEquipe`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarDescricaoEquipe: (descEquipe) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM equipes WHERE descEquipe = ?', [descEquipe], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (codEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM equipes WHERE codEquipe = ?', [codEquipe], (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (codEquipe, descEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO equipes (descEquipe) VALUES (?)',
                [descEquipe],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (codEquipe, descEquipe) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE equipes SET descEquipe = ?  WHERE codEquipe = ?',
                [descEquipe, codEquipe],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (codEquipe) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM equipes WHERE codEquipe = ?', [codEquipe], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};