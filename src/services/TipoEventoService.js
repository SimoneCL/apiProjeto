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
    buscarPorDescTipoEvento: (descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM tipoEventos WHERE descTipoEvento like '%${descTipoEvento}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarUm: (codTipo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tipoEventos WHERE codTipo = ?', [codTipo], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (codTipo, descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO tipoEventos (codTipo, descTipoEvento) VALUES (?,?)', 
                [codTipo,descTipoEvento],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertcodTipo);
                }
            );
        });
    },

    alterar: (codTipo ,descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE tipoEventos SET descTipoEvento = ? WHERE codTipo = ?', 
                [descTipoEvento, codTipo],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (codTipo) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM tipoEventos WHERE codTipo = ?',[codTipo], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};