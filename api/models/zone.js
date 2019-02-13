var mongoose = require('mongoose');

const ZoneSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	itemName: String,
	itemFriends: [
		{
			name:String,
			team:Number,
		}
	]
});

module.exports = mongoose.model('Zone',ZoneSchema);

