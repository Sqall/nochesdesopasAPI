const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Amigo = require('../models/amigo');

router.get('/',(req,res,next) => {
    Amigo.find()
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'Hubo un error inesperado.'});
            }
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.get('/byId/:id',(req,res,next) => {
    Amigo.find({'_id':req.params.id})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese ID'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});


router.get('/byName/:name',(req,res,next) => {
    Amigo.find({'name':req.params.name})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese nombre'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byEmail/:email',(req,res,next) => {
    Amigo.find({'email':req.params.email})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese email'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byEquipo/:team',(req,res,next) => {
    Amigo.find({'team':req.params.team})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentran amigos en ese equipo'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

///-----------------------POST

router.post('/',(req,res,next) => {
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    const newAmigo = new Amigo({
        id: req.body.id,
		name: req.body.name,
        notes: {date:dateTime, text: req.body.note},
		team: req.body.team,
		eamil: req.body.email
    });

    newAmigo.save()
        .then(result => {
            res.status(200).json({
                message:'Amigo añadido',
                createdAmigo: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

///-----------------------DELETE

router.delete('/id/:id', (req,res,next) => {
    Amigo.findOneAndDelete({'id': req.params.id})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese id'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});


router.delete('/name/:name', (req,res,next) => {
    Amigo.findOneAndDelete({'name': req.params.name})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese nombre'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});

router.delete('/email/:email', (req,res,next) => {
    Amigo.findOneAndDelete({'emial': req.params.email})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese email'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});

module.exports = router;

