const db = require('../data/db');
const express = require('express');


const router = express.Router();





router.post('/api/posts', (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    db.insert(req.body.post, req.body.id)
    .then((ids)=>{
        res.status(201).json(ids)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    })
})
//good
router.get('/api/posts', (req,res) => {
    db.find()
    .then((posts) =>{
        res.status(200).json(posts);
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})
//all good
router.get('/api/posts/:id', (req,res) => {
    db.findById(req.params.id)
    .then((posts) =>{
        if (posts){
            res.status(200).json(posts);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }  
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    })
})

//
router.get('/api/posts/:id/comments', (req,res) => {
    db.findPostComments()
})





module.exports = router;