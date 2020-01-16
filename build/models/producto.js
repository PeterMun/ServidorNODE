"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let productoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre Obligatorio']
    },
    precioUnitario: {
        type: Number,
        required: [true, 'Precio Obligatorio']
    },
    descripcion: {
        type: String,
        required: [false]
    },
    disponible: {
        type: Boolean,
        required: [true],
        default: true,
    },
    // relacion categoria
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'categoria'
    }
});
exports.default = mongoose_1.model('Producto', productoSchema);
