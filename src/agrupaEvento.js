class agrupaEvento {
    constructor() { }
    agrupByUser(eventos) {
        let items = []

        let resultado = [];
        for (const objeto of eventos) {
            
            const chaveDuplicada = resultado.find(
                (item) =>
                    item.idUsuario === objeto.idUsuario &&
                    item.nomeUsuario === objeto.nomeUsuario
            );

            if (chaveDuplicada) {
                // Se já existe um objeto com a mesma chave, mesclar as propriedades
                Object.assign(chaveDuplicada, objeto);
            } else {
                // Caso contrário, adicionar o objeto ao resultado
                resultado.push(objeto);
            }
        }
        items = resultado;

        return resultado;

    }

    formatoProperty(data) {
        var d = new Date(data),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;
    
        return [year, month, day].join('-');
      }
}
module.exports = new agrupaEvento();