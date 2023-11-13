const UsuarioService = require('../services/UsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {

        let json = { items: [], error: '' };
        if (req.query.nomeUsuario) {
            let usuario = await UsuarioService.buscarPorNomeUsuario(req.query.nomeUsuario);
            for (let i in usuario) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    nomeUsuario: usuario[i].nomeUsuario,
                    email: usuario[i].email,
                    tipoPerfil: usuario[i].tipoPerfil,
                    senha: usuario[i].senha
                });
            }
            res.json(json);
        } else {
            if(req.query.idUsuario){
                let usuario = await UsuarioService.buscarUm(req.query.idUsuario);

                if (usuario) {
        
                    for (let i in usuario) {
                        json.items.push({
                            idUsuario: usuario[i].idUsuario,
                            nomeUsuario: usuario[i].nomeUsuario,
                            email: usuario[i].email,
                            tipoPerfil: usuario[i].tipoPerfil,
                            senha: usuario[i].senha
                        });
                    }
                }
        
                res.json(json);
            }
            else {
                let usuario = await UsuarioService.buscarTodos();
                for (let i in usuario) {
                    json.items.push({
                        idUsuario: usuario[i].idUsuario,
                        nomeUsuario: usuario[i].nomeUsuario,
                        email: usuario[i].email,
                        tipoPerfil: usuario[i].tipoPerfil,
                        senha: usuario[i].senha
                    });
                }
                res.json(json);
            }
        }
    },

    buscarUm: async (req, res) => {

        let json = {};
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);

        if (usuario) {
            json = usuario;
        }
        res.json(json);
    },
    
    buscarEmail: async (req, res) => {
        let json = {}; //{ error: '', items: {} };
        let email = req.params.email;
        let usuario = await UsuarioService.buscarEmail(email);
        if (usuario) {
            json = usuario;
            
            let nomeUsuario = usuario[0].nomeUsuario;
    
            const tamanhoSenha = 6;
            const caracteres = '0123456789';
            let senha = '';
                      
            for (let i = 0; i < tamanhoSenha; i++) {
                const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                senha += caracteres.charAt(indiceAleatorio);
            }
                      
            UsuarioService.alterarSenhaAleatoria(email, senha);

            const nodemailer = require('nodemailer');

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'marcodalacort@gmail.com',
                    pass: 'rshwumnrstmjoiog',
                },
            });
            const mailOptions = {
                from: 'marcodalacort@gmail.com',
                to: email,
                subject: 'Recuperação de Senha do Sistema Férias e Folgas',
                html: `
                    <p>Prezado(a) ${nomeUsuario},</p>
                    <p>Recebemos uma solicitação de recuperação de senha para a sua conta no Férias e Folgas Totvs.</p>
                    <p>Sua nova senha temporária é: <span style="font-size: 18px; font-weight: bold;">${senha}</span>.</p>
                    <p>Use esta senha temporária para acessar sua conta.<p> 
                    <p>Recomendamos que você faça login imediatamente e altere sua senha depois de entrar na sua conta.</p>
                    <p>Atenciosamente,<br>A Equipe do Férias e Folgas Totvs.</p>
                    `,
              };
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Erro ao enviar o e-mail: ' + error);
                } else {
                  console.log('E-mail enviado com sucesso: ' + info.response);
                }
              });
        }
        res.json(json);
    },
    buscarUsuariolookup: async (req, res) => {

        let json = { error: '', items: [] };
        let idUsuario = req.params.idUsuario;
        let usuario = await UsuarioService.buscarUm(idUsuario);

        if (usuario) {

            for (let i in usuario) {
                json.items.push({
                    idUsuario: usuario[i].idUsuario,
                    nomeUsuario: usuario[i].nomeUsuario,
                    email: usuario[i].email,
                    tipoPerfil: usuario[i].tipoPerfil,
                    senha: usuario[i].senha
                });
            }
        }

        res.json(json);
    },
    inserir: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        let senha = req.body.senha;
        if (nomeUsuario && email && tipoPerfil) {
            await UsuarioService.inserir(nomeUsuario, email, tipoPerfil, senha);

            json.items = {
                idUsuario,
                nomeUsuario,
                email,
                tipoPerfil,
                senha
            };

        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },

    alterar: async (req, res) => {
        let json = { error: '', items: {} };

        let idUsuario = req.params.idUsuario;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;

        if (idUsuario && nomeUsuario && email && tipoPerfil) {
            await UsuarioService.alterar(idUsuario, nomeUsuario, email, tipoPerfil);
            json.items = {
                idUsuario,
                nomeUsuario,
                email,
                tipoPerfil
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },
    // alterarSenhaAleatoria: async (req, res) => {
    //     let json = { error: '', items: {} };
    //     let email = req.params.email;
    //     let senha = req.body.senha;

    //     if (email && senha) {
    //         await UsuarioService.alterarSenha(email, senha);
    //         json.items = {
    //             email,
    //             senha
    //         };
    //     } else {
    //         json.error = 'Campos não enviados';
    //     }
    //     res.json(json);

    // },
    alterarSenha: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let senha = req.body.senha;

        if (idUsuario && senha) {
            await UsuarioService.alterarSenha(idUsuario, senha);
            json.items = {
                idUsuario,
                senha
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);

    },

    excluir: async (req, res) => {
        let json = { error: '', items: {} };

        await UsuarioService.excluir(req.params.idUsuario);

        res.json(json);
    }
}
