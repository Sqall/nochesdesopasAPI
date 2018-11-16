var mongoose = require('mongoose');

//mongoose.connect('mongodb://angrydante:angrydan@ds125048.mlab.com:25048/angryiglesia');

//-------------------------------- GET
const ClothSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	name: String,
	size: String,
	quantity: String,
	max: Number,
	min: Number,
	gender: String,
	intransit: Number
});

module.exports = mongoose.model('Cloth',ClothSchema);

