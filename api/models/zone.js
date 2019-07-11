var mongoose = require('mongoose');

const ZoneSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	itemTeam:Number,
	itemName: String,
	itemFriends: [
		{
			name:String
		}
	]
});

module.exports = mongoose.model('Zone',ZoneSchema);

