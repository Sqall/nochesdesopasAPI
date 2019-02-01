var mongoose = require('mongoose');

var TransitSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
    itemId: Number,
	itemName: String,
	itemSize: mongoose.Schema.Types.Mixed,
    itemGender: String,
	itemQuantity: Number,
    itemZone: String
});

module.exports = mongoose.model('Transit',TransitSchema);
