var mongoose = require('mongoose');

const AmigoSchema = mongoose.Schema({
	id:{
		type: Number,
		index:true
	},
	name: String,
    notes: [String],
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9!](?:[a-z0-9-]*[a-z09])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?/}
});

module.exports = mongoose.model('amigos',AmigoSchema);

