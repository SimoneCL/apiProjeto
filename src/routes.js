const express = require('express');
const router = express.Router();

const TipoEventoController = require('./controllers/TipoEventoController');
router.get('/tipoEvento',TipoEventoController.buscarTodos);
router.get('/tipoEvento/:code',TipoEventoController.buscarUm);
router.post('/tipoEvento', TipoEventoController.inserir);
router.put('/tipoEvento/:code', TipoEventoController.alterar);
router.delete('/tipoEvento/:code', TipoEventoController.excluir);


const FeriadosController = require('./controllers/FeriadosController');
router.get('/feriados',FeriadosController.buscarTodos);
router.get('/feriados/:data',FeriadosController.buscarUm);
router.post('/feriados', FeriadosController.inserir);
router.put('/feriados/:data', FeriadosController.alterar);
router.delete('/feriados/:data', FeriadosController.excluir);

const EventoController = require('./controllers/EventoController');
router.get('/evento',EventoController.buscarTodos);
router.get('/evento/:user',EventoController.buscarUm);
router.post('/evento', EventoController.inserir);
router.put('/evento/:user', EventoController.alterar);
// router.delete('/evento/:user', EventoController.excluir); ainda não está pronto
module.exports = router;