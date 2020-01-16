import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import categoria  from './routes/categoria';

import producto  from './routes/producto';




class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(){

        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda'
        mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true}).then(()=>{
            console.log("BDD OK");
        });
        
        this.app.set('port',process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({extended:false}));

        
    }

    routes(){
        
        this.app.use('/api/categoria', categoria);
        this.app.use('/api/producto', producto);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor Funcionando")
        });
    }

}

const server = new Server();
server.start();