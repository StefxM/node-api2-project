const db = require('../data/db');
const express = require('express');


const router = express.Router();




//all good
router.post('/api/posts', (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    db.insert(req.body)
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
//all good
router.post("/api/posts/:id/comments", (req,res) => {
    
    if (!req.body.text) {
        return res.status(400).json({
            message: "Please provide text for the comment."

        })
    }
    db.insertComment(req.body)
        .then((comment) => {
            res.status(201).json(comment)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "There was an error while saving the comment to the database"
            })
        })
    
})


//all good
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

//all good
router.get('/api/posts/:id/comments', (req,res) => {
    db.findPostComments(req.params.id)
    .then((comments) =>{
        if (comments) {
            res.json(comments)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    }).catch((error)=> {
        console.log(error)
        res.status(500).json({
            message: "The comments information could not be retrieved."
        })
    })
})
//"kind of works"
router.delete("/api/posts/:id", (req,res) => {
    
    db.remove(req.params.id, req.body)
    .then((posts) => {
        if (posts > 0) {
            res.status(200).json({
                message: `Id:${req.params.id} ${req.body} was deleted`
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})
//all good
router.put("/api/posts/:id", (req,res) => {
    if (!req.body.title || !req.body.contents)  {
        return res.status(400).json({
            message:"Please provide title and contents for the post."
        })
    }

    db.update(req.params.id, req.body)
    .then((posts) => {
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post information could not be modified."
        })
    })
})


module.exports = router;