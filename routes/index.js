const express = require('express');
const { getAllInventoryItem,getSingleInventoryItem,addInventoryItem } = require('../controller/inventory_controller');
const router = express.Router();

module.exports = router.get('/inventory',getAllInventoryItem);
module.exports = router.get('/inventory/item/:id',getSingleInventoryItem);
module.exports = router.post('/inventory/post',addInventoryItem)