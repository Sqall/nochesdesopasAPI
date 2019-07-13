var mongoose = require('mongoose');

const ClothSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	itemName: String,
	itemSize: String,
	itemQuantity: Number,
	itemMax: Number,
	itemMin: Number,
	itemGender: String,
	itemDonacion: Number
});

module.exports = mongoose.model('Cloth',ClothSchema);

