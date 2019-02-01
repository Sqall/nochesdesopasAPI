var mongoose = require('mongoose');

var RecordSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	itemDeliveredName: String,
    itemSize: mongoose.Schema.Types.Mixed,
    date: Date,
    itemGender: String,
    deliveredTo: String,
    deliveredByTeam: String
});

module.exports = mongoose.model('Record',RecordSchema);
