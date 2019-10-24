var mongoose = require('mongoose');

const AmigoSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
  },
  // Datos Primarios
  name: String,
  surname: String,
  age: Number,
  location: String,
  ds_1: String, // Situacion actual    
  // Datos Secundarios
  ds_2: String, // Como llego a su situacion
  dni: Number, // tamaño fijo?
  d_fam: String, // Familia a cargo
  t_st: String, // Tiempo en calle
  d_work: String, // datos sobre su trabajo o no
  d_gob: String, //datos sobre ayuda gubernamental
  d_health: String, // datos sobre salud
  d_hostel: String, // datos sobre parador 
  formalities: [String], // Tramites
  d_sizes: [], // Arreglo Vacio, se puede insertar cualquier data
  search: [], // Arreglo Vacio, se puede insertar cualquier data
  notes: [{fecha: Date, text: String}],
  team: Number,
  email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9!](?:[a-z0-9-]*[a-z09])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?/}
});

module.exports = mongoose.model('amigos',AmigoSchema);

