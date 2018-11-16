const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//------ Controllers
// const HeroesController = require ('../controllers/cloth');

const Cloth = require('../models/cloth');

router.get('/',(req,res,next) => {
    Cloth.find()
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.get('/byName/:name',(req,res,next) => {
    Cloth.find({'name':req.params.name})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byId/:id',(req,res,next) => {
    Cloth.find({'_id':req.params.id})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/bySize/:size',(req,res,next) => {
    Cloth.find({'size':req.params.size})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byGender/:gender',(req,res,next) => {
    Cloth.find({'gender':req.params.gender})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byQuantity/:quantity',(req,res,next) => {
    const filter = parseInt(req.params.quantity);
    Cloth.find({'quantity': filter })
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMax/:max',(req,res,next) => {
    const filter = parseInt(req.params.max);
    Cloth.find({'max': filter })
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMin/:min',(req,res,next) => {
    const filter = parseInt(req.params.min);
    Cloth.find({'min': filter})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byLessThan/:nro',(req,res,next) => {
    const filter = parseInt(req.params.nro);
    Cloth.find({'quantity': {$lt: filter }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMoreThan/:nro',(req,res,next) => {
    const filter = parseInt(req.params.nro);
    Cloth.find({'quantity': {$gte: filter }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});


//----------------- POSTS


router.post('/',(req,res,next) => {
    
    const cloth = new Cloth({
        name:req.body.name,
		size: req.body.size,
		quantity: req.body.quantity,
		max: req.body.max,
		min: req.body.min,
		gender: req.body.gender
    });
    cloth.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:'Cloth Created',
                createdCloth: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
});

module.exports = router;
