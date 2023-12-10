const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tipoEventos ORDER BY descTipoEvento', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPorDescTipoEvento: (descTipoEvento) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM tipoEventos WHERE descTipoEvento like '%${descTipoEvento}%' ORDER BY descTipoEvento`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarUm: (codTipo) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT *, EXISTS (SELECT ${codTipo} FROM evento WHERE evento.codTipo =  tipoeventos.codtipo ) as 'possuiEvento'
                      FROM tipoEventos WHERE codTipo = ${codTipo}`, (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    buscarEventoCodTipo: (codTipo) => {

        return new Promise((aceito, rejeitado) => {
            db.query(` SELECT * FROM tipoeventos
                    WHERE codTipo =  ${codTipo}
                    AND EXISTS (
                        SELECT ${codTipo} FROM evento
                        WHERE evento.codTipo =  tipoeventos.codtipo )`, (error, items) => {
                if (error) { rejeitado(error); return; }

                aceito(items);
            });
        });
    },

    inserir: (descTipoEvento,faixaData) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO tipoEventos (descTipoEvento,faixaData) VALUES (?,?)',
                [descTipoEvento,faixaData],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertcodTipo);
                }
            );
        });
    },

    alterar: (codTipo, descTipoEvento,faixaData) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE tipoEventos SET descTipoEvento = ?, faixaData = ? WHERE codTipo = ?',
                [descTipoEvento,faixaData, codTipo],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (codTipo) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM tipoEventos WHERE codTipo = ?', [codTipo], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};