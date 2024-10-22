const express = require('express');
const {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    // addImageToItem,
    upload,
} = require('../controllers/itemController.js');

// const { authenticateToken } = require('../middleware/authMiddleware.js');


const router = express.Router();

router.post('/createItem', upload, createItem);

router.get('/getAllItems', upload, getAllItems);

router.get('/getItemById/:id', getItemById);

router.put('/updateItem/:id',updateItem);
router.delete('/deleteItem/:id',deleteItem);

// router.post('/items/image',upload,authenticateToken, addImageToItem);

module.exports = router;
