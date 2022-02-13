//sesion.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var sesionSchema   = new Schema({
    fecha:{ type: String },  
    id:{ 
        type: String,
        required: true
    }
});

sesionSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    return obj;
}

sesionSchema.set('toJSON', { hide: '_id' })
module.exports = mongoose.model('Sesion', sesionSchema);