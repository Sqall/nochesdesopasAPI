var mongoose = require('mongoose');

var FoodSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	name: String,
	size: Number,
	quantity: Number,	
	max: Number,
	min: Number
});

module.exports = mongoose.model('Food',FoodSchema);
