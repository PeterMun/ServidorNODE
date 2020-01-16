import { Schema, model, SchemaType } from 'mongoose';

let productoSchema = new Schema(
{
    nombre : {
        type : String,
        required: [true, 'Nombre Obligatorio']
    },

    precioUnitario : {
        type : Number,
        required: [true, 'Precio Obligatorio']
    },

    descripcion : {
        type : String,
        required: [false]
    },

    disponible: {
        type : Boolean,
        required:[true], 
        default:true,
    },

    // relacion categoria
    categoria: {
        type: Schema.Types.ObjectId,
        
        required: true,
        ref: 'categoria'
    }


});

export default model('Producto', productoSchema);