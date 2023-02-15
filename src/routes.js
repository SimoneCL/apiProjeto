const express = require('express');
const router = express.Router();

const TipoEventoController = require('./controllers/TipoEventoController');
router.get('/tipoEvento',TipoEventoController.buscarTodos);
router.get('/tipoEvento/:code',TipoEventoController.buscarUm);
router.post('/tipoEvento', TipoEventoController.inserir);
router.put('/tipoEvento/:code', TipoEventoController.alterar);
router.delete('/tipoEvento/:code', TipoEventoController.excluir);


// const feriadosController = require('./controllers/feriadosController');
// router.get('/feriados',feriadosController.buscarTodos);
// router.get('/feriados/:data',feriadosController.buscarUm);
// router.post('/feriados', feriadosController.inserir);
// router.put('/feriados/:data', feriadosController.alterar);
// router.delete('/feriados/:data', feriadosController.excluir);


module.exports = router;