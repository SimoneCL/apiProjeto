const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tipoEventos', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (code) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tipoEventos WHERE code = ?', [code], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (code, descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO tipoEventos (code, descTipoEvento) VALUES (?,?)', 
                [code,descTipoEvento],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertcode);
                }
            );
        });
    },

    alterar: (code ,descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE tipoEventos SET descTipoEvento = ? WHERE code = ?', 
                [descTipoEvento, code],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (code) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM tipoEventos WHERE code = ?',[code], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};