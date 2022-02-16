//person.js

var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

var respuestaSchema   = new Schema({
    resultados: [{
        type: Object,
    }],
    totalRegistros:{ type: String },
    estampaTiempo:{ type: String }, 
    mensajes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensaje'
    }], 
});

respuestaSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    obj.mensajes.forEach(element => {
        delete element._id;
    });
    obj.resultados.forEach(element => {
        delete element._id;
    });
    delete obj.mensajes._id;
    return obj;
}

respuestaSchema.set('toJSON', { hide: '_id' })
module.exports = mongoose.model('Respuesta', respuestaSchema);