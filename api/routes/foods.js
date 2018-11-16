const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//------ Controllers
// const HeroesController = require ('../controllers/cloth');

const Food = require('../models/food');

router.get('/',(req,res,next) => {
    Food.find()
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

router.get('/byId/:id',(req,res,next) => {
    Food.find({'id':req.params.id})
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
    Food.find({'name': req.params.name})
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

router.get('/bySize/:size',(req,res,next) => {
    const filter = parseInt(req.params.size);
    Food.find({'size': filter})
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

router.get('/byQuantity/:quantity',(req,res,next) => {
    const filter = parseInt(req.params.quantity);
    Food.find({'quantity': filter})
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

router.get('/byMax/:max',(req,res,next) => {
    const filter = parseInt(req.params.max);
    Food.find({'max': filter})
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

router.get('/byMin/:min',(req,res,next) => {
    const filter = parseInt(req.params.min);
    Food.find({'min': filter})
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

router.get('/byLessThan/:nro',(req,res,next) => {
    const filter = parseInt(req.params.nro);    
    Food.find({'quantity': {$lte: filter }})
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
    Food.find({'quantity': {$gte: filter }})
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

//--------------POST
router.post('/',(req,res,next) => {
    console.log(req.body);
    
    const food = new Food({
        name: req.body.name,
        size: req.body.size,
        quantity: req.body.quantity,	
        max: req.body.max,
        min: req.body.min
    });

    food.save()
        .then(result => {
            res.status(200).json({
                message:'Food Created',
                createdFood: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
