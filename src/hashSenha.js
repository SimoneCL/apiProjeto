var crypto = require('crypto');

class HashSenha {

    constructor () {}

    gerarSalt() {
        return crypto.randomBytes(16).toString('hex');
    }
    
    sha512(senha, salt) {
        var hash = crypto.createHash('sha512', salt);
        hash.update(senha);
        var hash = hash.digest('hex');
        return {
            salt,
            hash
        }
    }
    
    gerarSenha(senha) {
        var salt = this.gerarSalt(16);
        var senhaSalt = this.sha512(senha, salt);       

        return senhaSalt.hash;
    }

}    

module.exports = new HashSenha();