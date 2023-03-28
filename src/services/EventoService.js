const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento WHERE idUsuario = ?', [idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    // id: number;
    // idUsuario: string;
    // dataEventoIni: string;
    // dataEventoFim: string;
    // codTipo: number | string;
    inserir: (idUsuario,  dataEventoIni, dataEventoFim, codTipo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO evento (idUsuario,  dataEventoIni, dataEventoFim, codTipo) VALUES (?,?,?,?)', 
                [idUsuario,  dataEventoIni, dataEventoFim, codTipo],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idUsuario,  dataEventoIni, dataEventoFim, codTipo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE evento SET dataEventoIni = ? , dataEventoFim = ? , codTipo = ? WHERE idUsuario = ?', 
                [dataEventoIni, dataEventoFim, codTipo,idUsuario],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE idUsuario = ?',[idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};