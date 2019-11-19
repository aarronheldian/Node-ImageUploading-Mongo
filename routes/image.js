const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

// Init Upload
var upload = multer({
    storage: storage
});

router.get('/', function(req, res, next){
    res.render('index', {title: 'Express'})
});

router.post('/', upload.any(), function(req, res, next){
    var newImage = new Image({
        path:req.files[0].path,
        originalname:req.files[0].originalname
    });
    Image.addImage(newImage, function(err){
        if (err){throw err}
    });
    res.render('index', {
        title: 'Express',
        file: `${req.files[0].path}`
    });
});

module.exports = router;