const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM feriados', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPorDescricao: (descricao) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM feriados WHERE descricao like '%${descricao}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (data) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM feriados WHERE data = ?', [data], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (data, descricao, tipoFeriado, pontoFacultativo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO feriados (data,  descricao, tipoFeriado, pontoFacultativo) VALUES (?,?,?,?)',
                [data, descricao, tipoFeriado, pontoFacultativo],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (data, descricao, tipoFeriado, pontoFacultativo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE feriados SET descricao = ? , tipoFeriado = ? , pontoFacultativo = ? WHERE data = ?',
                [descricao, tipoFeriado, pontoFacultativo, data],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (data) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM feriados WHERE data = ?', [data], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};