const express = require('express');
const { getAllInventoryItem,getSingleInventoryItem,addInventoryItem ,deleteInventoryItem,updateInventoryItem} = require('../controller/inventory_controller');
const { createSaleRecord,getAllRecordSale,getSaleRecordById ,deleteSaleRecord} = require('../controller/SalesRecord_controller');
const { createSupplier,getAllSupplier,deleteSupplier,updateSupplierInfo,getSupplierbyID } = require('../controller/supplier_controller');
const { createCustomerDetail, getAllCustomerInformation,deleteCustomer } = require('../controller/customer_controller');
const router = express.Router();
// inventory routes CRUD ROUTES
module.exports = router.get('/inventory',getAllInventoryItem);
module.exports = router.get('/inventory/item/:id',getSingleInventoryItem);
module.exports = router.post('/inventory/post',addInventoryItem)
module.exports = router.delete('/inventory/item/:id',deleteInventoryItem);
module.exports = router.patch('/inventory/item/:id',updateInventoryItem);
// saleRecord routes crud routes
module.exports = router.post('/sale/record',createSaleRecord);
module.exports = router.get('/sale/record',getAllRecordSale)
module.exports = router.get('/sale/record/item/:id',getSaleRecordById)
module.exports = router.delete('/sale/record/:id',deleteSaleRecord)
// supplier routes
module.exports = router.post('/supplier/post',createSupplier);
module.exports = router.get('/supplier',getAllSupplier)
module.exports = router.get('/supplier/:id',getSupplierbyID)

module.exports = router.delete('/supplier/:id',deleteSupplier)
module.exports = router.patch('/supplier/:id',updateSupplierInfo)
// customer routes
module.exports = router.post('/customer/post',createCustomerDetail)
module.exports = router.get('/customer/',getAllCustomerInformation)
module.exports = router.delete('/customer/:id',deleteCustomer);

