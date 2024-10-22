const Item = require('../models/Item'); 
const Category = require('../models/Category');

const multer = require('multer');
const path = require('path');



exports.createItem = async (req, res) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);
    console.log(category)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const item = await Item.create({
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null,

      description: req.body.description,
      categoryId: req.body.categoryId,
      createdAt: new Date(),
      updatedAt: new Date()
      
    });
    console.log(">>>>>>>>>",item)

    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      message: 'Error creating item',
      error: error.message
    });
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll(); 
    res.status(200).json({ message: 'Items retrieved successfully', items });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error retrieving items', error: error.message });
  }
};


exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id); 
    if (item) {
      res.status(200).json({ message: `Item with ID ${id} retrieved successfully`, item });
    } else {
      res.status(404).json({ message: `Item with ID ${id} not found` });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error retrieving item', error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, categoryId } = req.body;
  console.log(name, price, description, categoryId);
  

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = name;
    item.price = price;
    item.description = description;
    item.categoryId = categoryId;

    if (req.file) {
      item.image = req.file.path;
    }

    await item.save();
    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};






exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete item with ID:", id);
  
  try {
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Item with ID ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};



// exports.addImageToItem = async (req, res) => {
//   const { item_id, image_url } = req.body;

//   try {
//     const item = await Item.findByPk(item_id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     const newImage = await Image.create({ image_url, itemId: item_id });
//     res.status(201).json({ message: 'Image added to item successfully', image: newImage });
//   } catch (error) {
//     console.error(error); 
//     res.status(500).json({ message: 'Error adding image to item', error: error.message });
//   }
// };


 const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'Images'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

exports.upload = multer({
  storage,
  limits: { fileSize: '5000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extname) return cb(null, true);
    cb('Invalid file format. Only images allowed.');
  },
}).single('image');