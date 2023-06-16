const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento ORDER BY dataEventoIni', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
   
    buscarUm: (idEvento) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento WHERE idEvento = ?', [idEvento], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    buscarEventosEquipeUsuario:(codEquipe, dataEventoIni, dataEventoFim) => {
        
        return new Promise((aceito, rejeitado) => {
             db.query(  `select usuario.idUsuario,usuario.nomeUsuario,equipeUsuario.codEquipe, equipes.descEquipe, evento.dataEventoIni,evento.dataEventoFim,tipoEventos.codTipo, tipoEventos.descTipoEvento 
                        from equipeUsuario 
                        LEFT join evento
                        on evento.idUsuario = equipeusuario.idUsuario
                        and (    evento.dataEventoIni between ('${dataEventoIni}') and ('${dataEventoFim}')
                        or  evento.dataEventoFim between ('${dataEventoIni}') and ('${dataEventoFim}')	)
                        INNER join equipes
                        on equipes.codEquipe =  equipeusuario.codEquipe
                        and equipes.codEquipe in (${codEquipe})
                        INNER join usuario
                        on usuario.idUsuario = equipeusuario.idUsuario
                        LEFT join tipoEventos
                        on tipoEventos.codTipo = evento.codTipo`            
                    , (error, items) => {
                 if (error) { rejeitado(error); return; }
                 aceito(items);
             });
         });
    },
    buscarPorIdUsuario:(idUsuario) => {
       return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM evento WHERE idUsuario in (${idUsuario}) ORDER BY dataEventoIni`, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    
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

    excluir: (idEvento, idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE idEvento = ? AND idUsuario = ?',[idEvento,idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};