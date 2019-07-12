const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Zone = require('../models/zone');

router.get('/',(req,res,next) => {
    Zone.find()
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

router.get('/names',(req,res,next) => {
    Zone.find({},{itemName:1,_id:0})
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

router.get('/:name',(req,res,next) => {
    Zone.find({itemName: req.params.name})
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

// ---------------- POSTS

router.post('/',(req,res,next) => {

    const newZone = new Zone({
        id: "1",
        itemName: req.body.itemName,
        itemFriends: req.body.itemFriends || [],
        itemTeam: req.body.itemTeam
    });

    newZone.save()
        .then(result => {
            res.status(200).json({
                message:'Zona Creada',
                createdZone: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/amigo', (req,res,next) => {
    Zone.update({itemName: req.body.zone},{$push:{itemFriends: {name:req.body.friend}}})
        .then(result => {
            res.status(200).json({
                message: 'Amigo agregado',
                addedFriend: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// ---------------- MODIFY
router.put('/:zone', (req,res,next) => {
    Zone.findOneAndReplace({'itemName': req.params.zone},{'itemFriends':req.body.itemFriends})
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


//---------------- DELETE
router.delete('/name/:name', (req,res,next) => {

    Zone.findOneAndDelete({'itemName': req.params.name})
        .then(result => {
            res.status(200).json({
                message:'Zone Deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;