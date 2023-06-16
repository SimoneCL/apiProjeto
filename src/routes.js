const express = require('express');
const router = express.Router();

const TipoEventoController = require('./controllers/TipoEventoController');
router.get('/tipoEvento',TipoEventoController.buscarTodos);
router.get('/tipoEvento/:codTipo',TipoEventoController.buscarUm);
router.post('/tipoEvento', TipoEventoController.inserir);
router.put('/tipoEvento/:codTipo', TipoEventoController.alterar);
router.delete('/tipoEvento/:codTipo', TipoEventoController.excluir);

const EquipesController = require('./controllers/EquipesController');
router.get('/equipes',EquipesController.buscarTodos);
router.get('/equipes/:codEquipe',EquipesController.buscarUm);
router.post('/equipes', EquipesController.inserir);
router.put('/equipes/:codEquipe', EquipesController.alterar);
router.delete('/equipes/:codEquipe', EquipesController.excluir);

const FeriadosController = require('./controllers/FeriadosController');
router.get('/feriados',FeriadosController.buscarTodos);
router.get('/feriados/:data',FeriadosController.buscarUm);
router.post('/feriados', FeriadosController.inserir);
router.post('/feriadosNacionais', FeriadosController.inserirNacionais);
router.put('/feriados/:idFeriado', FeriadosController.alterar);
router.delete('/feriados/:idFeriado', FeriadosController.excluir);

const EventoController = require('./controllers/EventoController');
router.get('/evento',EventoController.buscarTodos);

router.get('/evento/:idEvento',EventoController.buscarUm);
router.post('/evento', EventoController.inserir);
router.put('/evento/:idUsuario', EventoController.alterar);
router.delete('/evento/:id', EventoController.excluir);

const UsuarioController = require('./controllers/UsuarioController');
router.get('/usuario',UsuarioController.buscarTodos);
router.get('/usuario/:idUsuario',UsuarioController.buscarUm);
router.post('/usuario', UsuarioController.inserir);
router.put('/usuario/:idUsuario', UsuarioController.alterar);
router.delete('/usuario/:idUsuario', UsuarioController.excluir);
//module.exports = router;

const EquipeUsuarioController = require('./controllers/EquipeUsuarioController');
router.get('/equipeUsuario',EquipeUsuarioController.buscarTodos);
router.get('/equipeUsuario/byEquipe',EquipeUsuarioController.buscarUsuarioEquipe);
router.get('/equipeUsuario/:id',EquipeUsuarioController.buscarUm);
router.post('/equipeUsuario', EquipeUsuarioController.inserir);
router.delete('/equipeUsuario/:id', EquipeUsuarioController.excluir);

const tipoPerfilUsuarioController = require('./controllers/tipoPerfilUsuarioController');
router.get('/tipoPerfilUsuario',tipoPerfilUsuarioController.buscarTodos);
router.get('/tipoPerfilUsuario/edit/:id',tipoPerfilUsuarioController.buscarUm);
router.post('/tipoPerfilUsuario', tipoPerfilUsuarioController.inserir);
router.put('/tipoPerfilUsuario/edit/:id', tipoPerfilUsuarioController.alterar);
router.delete('/tipoPerfilUsuario/:id', tipoPerfilUsuarioController.excluir);

const LoginController = require('./controllers/LoginController');
router.get('/login',LoginController.buscarTodos);
router.get('/login/:user', LoginController.buscarUm);

module.exports = router;