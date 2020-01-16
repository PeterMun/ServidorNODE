"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre Obligatorio']
    }
});
exports.default = mongoose_1.model('Categoria', categoriaSchema);
