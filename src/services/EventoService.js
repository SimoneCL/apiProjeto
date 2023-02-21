const db = require('../db');

// para fazer validações tive que instalar o express-validator (npm install --save express-validator)
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento', (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });
    },

    buscarUm: (user) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM evento WHERE user = ?', [user], (error, items) => {
                if (error) { rejeitado(error); return; }
                if (items.length > 0) {
                    aceito(items[0]);
                } else {
                    aceito(false);
                }
            });
        });

    },
    // id: number;
    // user: string;
    // eventIniDate: string;
    // eventEndDate: string;
    // type: number | string;
    inserir: (user,  eventIniDate, eventEndDate, type) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO evento (user,  eventIniDate, eventEndDate, type) VALUES (?,?,?,?)', 
                [user,  eventIniDate, eventEndDate, type],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items.insertdata);
                }
            );
        });
    },

    alterar: (user,  eventIniDate, eventEndDate, type) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE evento SET eventIniDate = ? , eventEndDate = ? , type = ? WHERE user = ?', 
                [eventIniDate, eventEndDate, type,user],    
                (error, items) => {
                    if (error) { rejeitado(error); return; }
                    aceito(items);
                }
            );
        });
    },

    excluir: (user) => {

        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM evento WHERE user = ?',[user], (error, items) => {
                if (error) { rejeitado(error); return; }
                aceito(items);
            });
        });

    }

};