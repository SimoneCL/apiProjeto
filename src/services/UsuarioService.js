const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query(`SELECT usuario.* , GROUP_CONCAT(equipes.descEquipe) AS equipes
                        FROM usuario
                        left JOIN equipeUsuario
                        ON equipeUsuario.idUsuario = usuario.idUsuario
                        left join equipes
                        on equipes.codEquipe = equipeusuario.codEquipe
                        GROUP BY usuario.idUsuario`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarUsuariodaEquipe: (codEquipe, nomeUsuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM usuario
                        INNER join equipeUsuario
                        on equipeUsuario.idUsuario =  usuario.idUsuario
                        and equipeUsuario.codEquipe in (${codEquipe})
                        and usuario.nomeUsuario like '%${nomeUsuario}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarPorNomeUsuario: (nomeUsuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT usuario.* , GROUP_CONCAT(equipes.descEquipe) AS equipes
            FROM usuario
            left JOIN equipeUsuario
            ON equipeUsuario.idUsuario = usuario.idUsuario
            left join equipes
            on equipes.codEquipe = equipeusuario.codEquipe
            WHERE nomeUsuario like '%${nomeUsuario}%'
            GROUP BY usuario.idUsuario `, (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });
    },
    buscarNomeUsuario: (nomeUsuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuario WHERE nomeUsuario = ?', [nomeUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });
    },
    buscarUsuarioPorEmail: (email) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuario WHERE email = ?', [email], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });
    },
    buscarUm: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {

            db.query(`SELECT * FROM usuario WHERE idUsuario in (${idUsuario})`, (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });

    },

    inserir: (nomeUsuario, email, tipoPerfil, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO usuario (nomeUsuario, email,tipoPerfil, senha) VALUES (?,?,?,?)',
                [nomeUsuario, email, tipoPerfil, senha],
                (error, items) => {

                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idUsuario, nomeUsuario, email, tipoPerfil) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE usuario SET nomeUsuario = ?, email = ?, tipoPerfil = ?  WHERE idUsuario = ?',
                [nomeUsuario, email, tipoPerfil, idUsuario],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    alterarSenha: (idUsuario, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE usuario SET senha = ?  WHERE idUsuario = ?',
                [senha, idUsuario],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};