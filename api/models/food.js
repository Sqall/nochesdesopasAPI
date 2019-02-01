var mongoose = require('mongoose');

var FoodSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	itemName: String,
	itemSize: Number,
	itemQuantity: Number,	
	itemMax: Number,
	itemMin: Number
});

module.exports = mongoose.model('Food',FoodSchema);
