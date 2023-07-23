const express = require('express');
const { getAllInventoryItem,getSingleInventoryItem } = require('../controller/inventory_controller');
const router = express.Router();

module.exports = router.get('/inventory',getAllInventoryItem);
module.exports = router.get('/inventory/:id',getSingleInventoryItem);