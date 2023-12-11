const UsuarioService = require('../services/UsuarioService');
const TipoEventoService = require('../services/TipoEventoService');
const FeriadosService = require('../services/FeriadosService');
const EventoService = require('../services/EventoService');
const EquipesService = require('../services/EquipesService');
const EquipeUsuarioService = require('../services/EquipeUsuarioService');
module.exports = {
    buscarTodos: async (req, res) => {
        let json = { items: [], error: '' };
        let detail = [];
        if (req.query.codEquipe && req.query.nomeUsuario) {

            let usuario = await UsuarioService.buscarUsuariodaEquipe(req.query.codEquipe, req.query.nomeUsuario);
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

            if (req.query.nomeUsuario) {
                let usuario = await UsuarioService.buscarPorNomeUsuario(req.query.nomeUsuario);
                for (let i in usuario) {
                    
                    let arrayDeObjetos = [];
                    if (usuario[i].equipes) {
                        let elementos = usuario[i].equipes.split(',');
                        arrayDeObjetos = elementos.map(elemento => ({ equipe: elemento }));
                    }
                    json.items.push({
                        idUsuario: usuario[i].idUsuario,
                        nomeUsuario: usuario[i].nomeUsuario,
                        email: usuario[i].email,
                        tipoPerfil: usuario[i].tipoPerfil,
                        senha: usuario[i].senha,
                        detail: arrayDeObjetos
                    });
                }
                res.json(json);
            } else {
                if (req.query.idUsuario) {
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

                        let arrayDeObjetos = [];
                        if (usuario[i].equipes) {
                            let elementos = usuario[i].equipes.split(',');
                            arrayDeObjetos = elementos.map(elemento => ({ equipe: elemento }));
                        }

                        json.items.push({
                            idUsuario: usuario[i].idUsuario,
                            nomeUsuario: usuario[i].nomeUsuario,
                            email: usuario[i].email,
                            tipoPerfil: usuario[i].tipoPerfil,
                            senha: usuario[i].senha,
                            detail: arrayDeObjetos
                        });



                    }
                    res.json(json);
                }
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

    comparaSenha: async (req, res) => {
        let json = {}; //{ error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let senhaUsuario = atob(req.params.senha); 
        let usuario = await UsuarioService.comparaSenha(idUsuario,senhaUsuario);
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
                    user: 'folgaferiastotvs@gmail.com',
                    pass: 'lnadbmnrsyfijmzk',                    
                }
                // auth: {
                //     user: 'marcodalacort@gmail.com',
                //     pass: 'rshwumnrstmjoiog'
                // }
                
            });
            console.log(email);
            const mailOptions = {
                from: 'folgaferiastotvs@gmail.com',
                to: email,
                subject: 'Recuperação de Senha do Sistema Férias e Folgas',
                html: `
                    <p>Prezado(a) ${nomeUsuario},</p>
                    <p>Recebemos uma solicitação de recuperação de senha para a sua conta no Férias e Folgas Totvs.</p>
                    <p>Sua nova senha temporária é: <span style="font-size: 18px; font-weight: bold;">${senha}</span>.</p>
                    <p>Use esta senha temporária para acessar sua conta.<p>
                    <p>Para acessar o app 
                    <a href="http://feriasfolgas.jv01.local/geren-ferias-folgas/#/login"> clique aqui </a> 
                    </p> 
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
        let json = { error: '', mailError: '', items: {} };
        let idUsuario = req.body.idUsuario;
        let idUsuarioAux = req.body.idUsuario;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let tipoPerfil = req.body.tipoPerfil;
        //let senha = req.body.senha;

        let usuarioCadastrado = await UsuarioService.buscarUsuarioPorEmail(email);
        if (usuarioCadastrado.length > 0) {
            json.error = 'Email já está cadastrado';
            res.json(json);
        } else {
            const tamanhoSenha = 6;
            const caracteres = '0123456789';
            let senha = '';
                        
            for (let i = 0; i < tamanhoSenha; i++) {
                const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                senha += caracteres.charAt(indiceAleatorio);
            }

            if (nomeUsuario && email && tipoPerfil) {
                await UsuarioService.inserir(nomeUsuario, email, tipoPerfil, senha);
                let usuario = await UsuarioService.buscarUsuarioPorEmail(email);
                for (let i in usuario) {
                    idUsuarioAux = usuario[i].idUsuario;
                }
                if (idUsuarioAux) {
                    let feriado = await FeriadosService.buscarTodos();
                    let codTipo = 0;

                    let tipoEvento = await TipoEventoService.buscarTodos();

                    for (let i in tipoEvento) {
                        if (tipoEvento[i].codTipo === 1) {  //1 - feriado
                            codTipo = tipoEvento[i].codTipo;
                        }
                    }

                    if (codTipo) {
                        for (let i in feriado) {
                            await EventoService.inserir(idUsuarioAux, feriado[i].data, feriado[i].data, codTipo);
                        }
                    }
                }

                json.items = {
                    idUsuario,
                    nomeUsuario,
                    email,
                    tipoPerfil,
                    senha
                };

                const nodemailer = require('nodemailer');
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'folgaferiastotvs@gmail.com',
                        pass: 'lnadbmnrsyfijmzk',                    
                    }
                    // auth: {
                    //     user: 'marcodalacort@gmail.com',
                    //     pass: 'rshwumnrstmjoiog'
                    // }
                    
                });            
                const mailOptions = {
                    from: 'folgaferiastotvs@gmail.com',
                    to: email,
                    subject: 'Usuário criado no Sistema Férias e Folgas',
                    html: `                        
                        <p>Prezado(a) ${nomeUsuario},</p>
                        <p>Você agora está registrado no Férias e Folgas Totvs.</p>
                        <p>Sua nova senha temporária é: <span style="font-size: 18px; font-weight: bold;">${senha}</span>.</p>
                        <p>Use esta senha temporária para acessar sua conta.<p> 
                        <p>Para acessar o app 
                        <a href="http://feriasfolgas.jv01.local/geren-ferias-folgas/#/login"> clique aqui </a> 
                        </p>
                        <p>Recomendamos que você faça login imediatamente e altere sua senha depois de entrar na sua conta.</p>
                        <p>Atenciosamente,<br>A Equipe do Férias e Folgas Totvs.</p>
                        `,
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Erro ao enviar o e-mail: ' + error);
                        json.mailError = 'Erro ao enviar o e-mail: Contate o Administrador e informe que envio de email falhou.';
                    } else {
                        console.log('E-mail enviado com sucesso: ' + info.response);                    
                    }

                    res.json(json);

                });

            } else {
                json.error = 'Campos não enviados';
                res.json(json);
            }
        }            
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
    alterarSenha: async (req, res) => {
        let json = { error: '', items: {} };
        let idUsuario = req.params.idUsuario;
        let senha = req.params.senha;
        //let senha = atob(req.params.senha);
        if (idUsuario) {
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
        let equipeUsuario = await EquipeUsuarioService.buscarEquipesUsuario(req.params.idUsuario);
        if (equipeUsuario.length > 0 ) {
            res.status(500).json({
                "data": "1",
                "type": "error",
                "message": 'Usuário não poderá ser eliminado.',
                "detailedMessage": 'A exclusão do usuário não será possível devido ao relacionamento com uma equipe.'
            });

        } else {
            await EventoService.excluirEventoDoUsuario(req.params.idUsuario);
            await UsuarioService.excluir(req.params.idUsuario);

            res.json(json);
        }
    }
}
