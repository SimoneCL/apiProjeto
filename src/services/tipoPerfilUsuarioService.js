const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM perfilusuario ORDER BY descricaoPerfil', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPerfilRelacUsuario: (tipoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM perfilusuario
            WHERE idTipoPerfil = ${tipoPerfil}
            AND EXISTS (
                SELECT ${tipoPerfil} FROM usuario
                WHERE usuario.tipoPerfil = perfilusuario.idTipoPerfil)`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPorDescricaoPerfil: (descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM perfilusuario WHERE descricaoPerfil like '%${descricaoPerfil}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarDescricaoPerfil: (descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM perfilusuario WHERE descricaoPerfil = ? ORDER BY descricaoPerfil', [descricaoPerfil], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (idTipoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM perfilusuario WHERE idTipoPerfil = ?', [idTipoPerfil], (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (descricaoPerfil,gestorPessoas) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO perfilusuario (descricaoPerfil,gestorPessoas) VALUES (?,?)',
                [descricaoPerfil,gestorPessoas],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idTipoPerfil, descricaoPerfil,gestorPessoas) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE perfilusuario SET descricaoPerfil = ? , gestorPessoas = ? WHERE idTipoPerfil = ?',
                [descricaoPerfil,gestorPessoas, idTipoPerfil],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (idTipoPerfil) => {

        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM perfilusuario WHERE idTipoPerfil = ?', [idTipoPerfil], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};