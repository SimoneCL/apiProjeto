const db = require('../db');
// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT s.usuario_id, s.substituto_id, u.nomeUsuario
                        FROM substitutos s
                        JOIN usuario u ON s.substituto_id = u.idUsuario
                        order by u.nomeUsuario`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
            // db.query(`SELECT * from substitutos`, (error, items) => {
            //     if (error) { rejeitado(error); return; }
            //     aceito(items);
            // });
        });
    },
    buscarUmSubstituto: (idUsuario, idSubstituto) => {
        return new Promise((aceito, rejeitado) => {

            db.query(`SELECT * from substitutos
                                WHERE usuario_id in (${idUsuario})
                                and substituto_id in (${idSubstituto})`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarUsuarioSubstitutos: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT s.usuario_id, s.substituto_id, u.nomeUsuario
            FROM substitutos s
            JOIN usuario u ON s.substituto_id = u.idUsuario
            WHERE s.usuario_id  in (${idUsuario})
            order by u.nomeUsuario`, (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {

                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });

    },
    buscarNomeUsuarioSubs: () => {
        
        return new Promise((aceito, rejeitado) => {

            db.query(`SELECT s.idSubstituto,u1.idUsuario,u2.idUsuario, u2.nomeUsuario AS substituto_nome
            FROM substitutos s
            JOIN usuario u1 ON s.usuario_id = u1.idUsuario
            JOIN usuario u2 ON s.substituto_id = u2.idUsuario
            WHERE u1.idUsuario in (${usuario_id})
            order by u2.nomeUsuario`, (error, items) => {
                          
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items);
                } else {
                    aceito(false);
                }
            });
        });
    },
    inserir: (usuario_id, substituto_id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO substitutos (usuario_id, substituto_id) VALUES (?,?)',
                [usuario_id, substituto_id],
                (error, items) => {

                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    excluir: (idSubstituto) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM substitutos WHERE substituto_id = ?', [idSubstituto], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};