const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM perfilusuario', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    
    buscarPorDescricaoEquipe: (descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM perfilusuario WHERE descricaoPerfil like '%${descricaoPerfil}%'`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarDescricaoEquipe: (descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM perfilusuario WHERE descricaoPerfil = ?', [descricaoPerfil], (error, items) => {
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
    
    inserir: (idTipoPerfil,  descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO perfilusuario (idTipoPerfil,  descricaoPerfil) VALUES (?,?)', 
                [idTipoPerfil,  descricaoPerfil],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idTipoPerfil,  descricaoPerfil) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE perfilusuario SET descricaoPerfil = ?  WHERE idTipoPerfil = ?', 
                [descricaoPerfil, idTipoPerfil],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (idTipoPerfil) => {

        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM perfilusuario WHERE idTipoPerfil = ?',[idTipoPerfil], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};