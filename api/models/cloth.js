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
	age: Number,
	intransit: Number
});


var Cloth = module.exports = mongoose.model('Cloth',ClothSchema);

module.exports.getCloth = function(callback){
	Cloth.find({},function(err,cloth){
		if(err){
			return callback(err);
		}
		return callback(null,cloth);
	});
};

module.exports.getClothById = function(callback){
	Cloth.find({'_id':id},function(err,cloth){
		if(err){
			return callback(err);
		}
		return callback(null,cloth);
	});
};

module.exports.getClothbyName = function(name,callback){
	Cloth.find({'name':name},function(err,cloth){
		if(err){
			return callback(err);
		}
		return callback(null,cloth);
	});
};

module.exports.getClothbyQuantity = function(quantity,callback){
	Cloth.find({'quantity':quantity},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};
//---------------------------------------- TO DO
module.exports.getClothLessThan = function(quantity,callback){
	Cloth.find({'min': {$gt: quantity} },function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

//---------------------------------------- TO DO
module.exports.getClothMoreThan = function(quantity,callback){
	Cloth.find({ 'max': {$lt: quantity} },function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getClothbyGender = function(gender,callback){
	Cloth.find({'gender':gender},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getClothbyAge = function(age,callback){
	Cloth.find({'age':age},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getClothbyTransit = function(transit,callback){
	Cloth.find({},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};
///--------------------------- POST

module.exports.newCloth = function(req,callback){

	var query = new Cloth({
		name:req.params.name,
		size: req.params.size,
		quantity: req.params.quantity,
		max: req.params.max,
		min: req.params.min,
		gender: req.params.gender,
		age: req.params.age,
		intransit: req.params.transit
	});
	
	query.save(function(err){
		if(err){
			return callback(err);
		}
		return callback(null,'Cloth Saved');
	});
};


