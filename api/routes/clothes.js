const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//------ Controllers
//
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
    Cloth.find({'itemName':req.params.name})
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
    Cloth.findOne({'_id':req.params.id})
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
    Cloth.find({'itemSize':req.params.itemSize})
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
    Cloth.find({'itemGender':req.params.itemGender})
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
    const filter = parseInt(req.params.itemQuantity);
    Cloth.find({'itemQuantity': filter })
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
    const filter = parseInt(req.params.itemMax);
    Cloth.find({'itemMax': filter })
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
    const filter = parseInt(req.params.itemMin);
    Cloth.find({'itemMin': filter})
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
    Cloth.find({'itemQuantity': {$lt: filter }})
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
    Cloth.find({'itemQuantity': {$gte: filter }})
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
    
    const newCloth = new Cloth({
        itemName: req.body.itemName,
		itemSize: req.body.itemSize,
		itemQuantity: req.body.itemQuantity,
		itemMax: req.body.itemMax,
		itemMin: req.body.itemMin,
        itemGender: req.body.itemGender,
        itemDonacion: req.body.itemDonacion
    });

    newCloth.save()
        .then(result => {
            res.status(200).json({
                message:'Ropa Created',
                createdCloth: result//CAN CREATE NEW OBJECT TO RETURN
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
    const newitemGender = req.body.itemGender;
    const newitemDonacion = req.body.itemDonacion;

    Cloth.findOneAndUpdate({'_id':req.params.id},{$set: {
            itemName: newitemName,
            itemSize: newitemSize,
            itemQuantity: newitemQuantity,
            itemMax: newitemMax,
            itemMin: newitemMin,
            itemGender: newitemGender,
            itemDonacion: newitemDonacion
        }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json({
                    message:'Ropa modificada',
                    createdCloth: doc
                });
            } else{
                res.status(404).json({message: 'No existe en el ropero'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});


//--------------- DELETE
router.delete('/id/:id', (req,res,next) => {
    Cloth.findOneAndDelete({'_id': req.params.id})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Ropa Eliminada'});
            } else{
                res.status(404).json({message: 'No existe en el ropero'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});

module.exports = router;
