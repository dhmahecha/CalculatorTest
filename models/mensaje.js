//person.js

var mongoose              = require('mongoose');
const MessageType     = require('../enums/messageType');
var Schema                = mongoose.Schema;

var mensajeSchema   = new Schema({
    tipo: {
        type: String,
        enum: Object.values(MessageType),
    },
    codigo:{ type: Number },  
    mensaje:{ type: String },
    descripcion: { type: String }
});

mensajeSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    return obj;
}

mensajeSchema.set('toJSON', { hide: '_id' })
module.exports = mongoose.model('Mensaje', mensajeSchema);