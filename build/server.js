"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const categoria_1 = __importDefault(require("./routes/categoria"));
const producto_1 = __importDefault(require("./routes/producto"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/tienda';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/categoria', categoria_1.default);
        this.app.use('/api/producto', producto_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor Funcionando");
        });
    }
}
const server = new Server();
server.start();
