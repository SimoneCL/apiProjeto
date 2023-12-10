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
    buscarPorData: (data) => {
        return new Promise((aceito, rejeitado) => {

            db.query(`SELECT * FROM evento 
                      where (    evento.dataEventoIni between ('${data}') and ('${data}')
                             or  evento.dataEventoFim between ('${data}') and ('${data}')	)
                      ORDER BY dataEventoIni `, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarPorDataExata: (idUsuario, dataEventoIni, dataEventoFim) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`SELECT * FROM evento 
                      where evento.idUsuario = ${idUsuario}
                      and   evento.dataEventoIni = ('${dataEventoIni}')
                      and   evento.dataEventoFim = ('${dataEventoFim}')	
                      ORDER BY dataEventoIni `, (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },
    buscarUm: (idEvento) => {
        return new Promise((aceito, rejeitado) => {


            db.query(`select evento.idEvento,evento.dataEventoIni, evento.dataEventoFim, evento.idUsuario,evento.codTipo, ifnull(feriados.descricao,tipoEventos.descTipoEvento) descricao
                        from  evento
                        LEFT join feriados
                        on feriados.data between evento.dataEventoIni and evento.dataEventoFim
                        LEFT join tipoEventos
                        on tipoEventos.codTipo = evento.codTipo
                        where  evento.idEvento =  ${idEvento}`, (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    buscarEventosEquipeUsuario: (codEquipe, dataEventoIni, dataEventoFim) => {

        return new Promise((aceito, rejeitado) => {
            db.query(`select usuario.idUsuario,usuario.nomeUsuario,equipeUsuario.codEquipe, equipes.descEquipe, evento.dataEventoIni,evento.dataEventoFim,tipoEventos.codTipo, tipoEventos.descTipoEvento 
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
                        on tipoEventos.codTipo = evento.codTipo
                        order by  usuario.nomeUsuario, evento.dataEventoIni`
                , (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                });
        });
    },
    buscarPorIdUsuario: (idUsuario, dataInicial, dataFinal, descricao, codTipo) => {
        
        return new Promise((aceito, rejeitado) => {
            let consultaSql = `select evento.idEvento,usuario.idUsuario,usuario.nomeUsuario, evento.dataEventoIni,evento.dataEventoFim, ifnull(feriados.descricao,tipoEventos.descTipoEvento) descricao,tipoEventos.codTipo, tipoEventos.descTipoEvento 
                                from usuario
                                INNER join evento
                                on evento.idUsuario =  usuario.idUsuario`;

            
            if (dataInicial !== undefined && dataFinal !== undefined) {
                consultaSql += ` and evento.dataEventoIni between ('${dataInicial}') and ('${dataFinal}') 
                                 and  evento.dataEventoFim between ('${dataInicial}') and ('${dataFinal}')`;
            } else {
                if (dataInicial !== undefined) {
                    consultaSql += ` and evento.dataEventoIni >= ('${dataInicial}')`;
                }
                if (dataFinal !== undefined) {
                    consultaSql += ` and evento.dataEventoIni <= ('${dataFinal}')`;
                }
            }

            if (codTipo !== undefined) {
                consultaSql += ` and  evento.codTipo in (${codTipo})`;

            }

            consultaSql += ` LEFT join feriados
                             ON feriados.data = evento.dataEventoIni
                            AND feriados.data = evento.dataEventoFim
                            inner join tipoEventos
                            on tipoEventos.codTipo = evento.codTipo`;
            if (idUsuario !== undefined) {
                consultaSql += ` where usuario.idUsuario = ${idUsuario}`;
            }

            if (descricao !== undefined) {
                consultaSql += ` and ifnull(feriados.descricao,tipoEventos.descTipoEvento) like '%${descricao}%'`;
            }
            consultaSql += ` order by evento.dataEventoIni`;
            
            db.query(consultaSql,
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                });
        });
    },

    inserir: (idUsuario, dataEventoIni, dataEventoFim, codTipo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO evento (idUsuario,  dataEventoIni, dataEventoFim, codTipo) VALUES (?,?,?,?)',
                [idUsuario, dataEventoIni, dataEventoFim, codTipo],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (idEvento, idUsuario, dataEventoIni, dataEventoFim, codTipo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE evento SET dataEventoIni = ? , dataEventoFim = ? , codTipo = ? WHERE idEvento = ? and idUsuario = ?',
                [dataEventoIni, dataEventoFim, codTipo, idEvento, idUsuario],
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },
    excluirEvento: (idEvento) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE idEvento = ? ', [idEvento], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    },
    excluirEventoDoUsuario: (idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE idUsuario = ? ', [idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    },
    excluir: (idEvento, idUsuario) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE idEvento = ? AND idUsuario = ?', [idEvento, idUsuario], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};