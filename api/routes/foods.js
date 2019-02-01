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
    Food.find({'itemName': req.params.itemName})
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
    const filter = parseInt(req.params.itemSize);
    Food.find({'itemSize': filter})
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
    const filter = parseInt(req.params.itemQuantity);
    Food.find({'itemQuantity': filter})
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
    const filter = parseInt(req.params.itemMax);
    Food.find({'itemMax': filter})
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
    const filter = parseInt(req.params.itemMin);
    Food.find({'itemMin': filter})
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
    Food.find({'itemQuantity': {$lte: filter }})
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
    Food.find({'itemQuantity': {$gte: filter }})
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
        itemName: req.body.itemName,
        itemSize: req.body.itemSize,
        itemQuantity: req.body.itemQuantity,	
        itemMax: req.body.itemMax,
        itemMin: req.body.itemMin
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

//---------------- UPDATE

router.put('/id/:id',(req,res,next) => {
    
    const newitemName = req.body.itemName;
    const newitemSize = req.body.itemSize;
    const newitemQuantity = req.body.itemQuantity;
    const newitemMax = req.body.itemMax;
    const newitemMin = req.body.itemMin;

    Food.findOneAndUpdate({'_id':req.params.id},{$set: {
            itemName: newitemName,
            itemSize: newitemSize,
            itemQuantity: newitemQuantity,
            itemMax: newitemMax,
            itemMin: newitemMin
        }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json({
                    message:'Comida modificada',
                    createdFood: doc
                });
            } else{
                res.status(404).json({message: 'No existe la comida'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.delete('/id/:id', (req,res,next) => {
    Food.findOneAndDelete({'_id': req.params.id})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Comida Eliminada'});
            } else{
                res.status(404).json({message: 'No existe la comida'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});


module.exports = router;
