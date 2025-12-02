const express=require('express');
const router=express.Router();
const itemsInventryController=require('../controller/itemsInventryController')


router.post('/add',itemsInventryController.addItems);
router.get('/',itemsInventryController.getAllItemsInInventry);
router.put('/:id',itemsInventryController.currentQty);

module.exports=router;