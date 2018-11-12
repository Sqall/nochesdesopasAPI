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
	min: Number,
	intransit: Number
});


var Food = module.exports = mongoose.model('Food',FoodSchema);

module.exports.getFood = function(callback){
	Food.find({},function(err,foods){
		if(err){
			return callback(err);
		}
		return callback(null,foods);
	});
};

module.exports.getFoodbyId = function(id,callback){
	Comida.find({'_id':id},function(err,food){
		if(err){
			return callback(err);
		}
		return callback(null,food);
	});
};

module.exports.getFoodbyName = function(name,callback){
	Comida.find({'name':name},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getFoodbySize = function(size,callback){
	Comida.find({'size':size},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getFoodbyQuantity = function(quantity,callback){
	Comida.find({'quantity':quantity},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getFoodLessThan = function(quantity,callback){
	Comida.find({},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getFoodMoreThan = function(quantity,callback){
	Comida.find({},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};

module.exports.getFoodbyTransit = function(transit,callback){
	Comida.find({},function(err,ropa){
		if(err){
			return callback(err);
		}
		return callback(null,ropa);
	});
};


module.exports.newComida = function(name,weight,price,cant,smax,smin,ssec,pllev,callback){

	var query = new Comida({
		nombre:name,
		peso:weight,		
		precio:price,
		cantidad:cant,
		stockmax:smax,
		stockmin:smin,
		stocksec:ssec,
		parallevar:pllev
	});

	query.save(function(err){
		if(err){
			return callback(err);
		}
		return callback(null,'Comida agregada correctamente');
	});
};

module.exports.deleteComida = function(id,callback){
	Comida.remove({'_id':id},function(err){
		if(err){
			return callback(err);
		}
		return callback(null,'Comida borrada correctamente');
	});
};

module.exports.editComida = function(id,weight,price,cant,smax,smin,ssec,pllev,callback){
	Comida.findOneAndUpdate({'_id':id},{peso:weight,precio:price,cantidad:cant,stockmax:smax,stockmin,smin,stocksec:ssec,parallevar:pllev},function(err){
		if(err){
			return callback(err);
		}
		return callback(null,'Comida editada correctamente');
	});
};
