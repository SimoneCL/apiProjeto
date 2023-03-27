const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM usuario', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    
    buscarPorUsuario: (usuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM usuario WHERE usuario like '%${usuario}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarDescricaoUsuario: (usuario) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuario WHERE usuario = ?', [usuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (idUsuario) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM usuario WHERE idUsuario = ?', [idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }

                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    
    inserir: (idUsuario,  usuario, email, tipoPerfil, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO usuario (idUsuario,  usuario, email, tipoPerfil, senha) VALUES (?,?,?,?,?)', 
                [idUsuario,  usuario, email, tipoPerfil, senha],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idUsuario,  usuario, email, tipoPerfil, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE usuario SET (usuario, email, tipoPerfil, senha) VALUES (?,?,?,?)  WHERE idUsuario = ?', 
                [usuario , email, tipoPerfil, senha, idUsuario],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM usuario WHERE idUsuario = ?',[idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};