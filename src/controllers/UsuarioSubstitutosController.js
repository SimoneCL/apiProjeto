const UsuarioSubstitutosService = require('../services/UsuarioSubstitutosService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { items: [], error: '' };
        if(req.query.usuario_id) {
            let substitutos = await UsuarioSubstitutosService.buscarUsuarioSubstitutos(req.query.usuario_id)
            for (let i in substitutos) {
                json.items.push({
                    usuario_id: substitutos[i].usuario_id,
                    substituto_id: substitutos[i].substituto_id,
                    nomeUsuario: substitutos[i].nomeUsuario
                });
    
            }
        } else {

            let substitutos = await UsuarioSubstitutosService.buscarTodos();
            for (let i in substitutos) {
                json.items.push({
                    usuario_id: substitutos[i].usuario_id,
                    substituto_id: substitutos[i].substituto_id,
                    nomeUsuario: substitutos[i].nomeUsuario
                });
    
            }
        }
       

        res.json(json);
    },
    buscarUm: async (req, res) => {

        let json = {};
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioSubstitutosService.buscarUm(idUsuario);

        if (usuario) {
            json = usuario;
        }
        res.json(json);
    },
    buscarUsuarioSubstitutos: async(req,substitutos) => {
        
        substitutos = await UsuarioSubstitutosService.buscarUsuarioSubstitutos(req)
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        
        let usuario_id = req.body.usuario_id;
        let substituto_id = req.body.substituto_id;
        let usuarioSubs = await UsuarioSubstitutosService.buscarUmSubstituto(usuario_id,substituto_id);
       
        if(usuarioSubs == false && usuario_id !== substituto_id) {
            await UsuarioSubstitutosService.inserir(usuario_id,substituto_id);
            json.items = {
                usuario_id,
                substituto_id
            };
            res.json(json);
        } else {
            if(usuario_id === substituto_id){
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": 'Usuário não pode ser relacionado a ele mesmo.',
                    "detailedMessage": 'Usuário não pode ser relacionado a ele mesmo.'
                });
            } else {
                res.status(500).json({
                    "data": "1",
                    "type": "error",
                    "message": 'Usuário já relacionado.',
                    "detailedMessage": 'Usuário substituto já relacionado.'
                });
            }
            
        }       
    },
    excluir: async (req, res) => {
        let json = { error: '', items: {} };
        await UsuarioSubstitutosService.excluir(req.params.idSubstituto);
        res.json(json);
    }
}
