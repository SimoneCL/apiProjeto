require('dotenv').config({path:'variaveis.env'}); //esse comando vai ler meu arquivos de variaveis de ambientes
const express = require('express');
const cors = require('cors'); //especificação da w3c para trabalhar com api
const bodyParser = require('body-parser'); //modulo capaz de converter uma requisição em vários formatos

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:false})); 
server.use(express.json()); //esse comando aqui é para dizer que vou receber um Json 

server.use('/', routes)
server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
})

