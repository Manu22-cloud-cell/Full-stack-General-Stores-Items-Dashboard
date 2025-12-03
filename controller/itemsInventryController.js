const ItemsInventory=require('../models/itemsInventry');

const addItems= async (req,res)=>{
    try {
        const {itemName,description,category,price,quantity}=req.body;
        const items= await ItemsInventory.create({
            itemName:itemName,
            description:description,
            category:category,
            price:price,
            quantity:quantity
        })
        console.log("Item has been added");
        res.status(201).json(items)
    } catch (error) {
        res.status(500).send({'error':error}) 
    }
}

const getAllItemsInInventry= async (req,res)=>{
    try {
    const items= await ItemsInventory.findAll();
    console.log("Fetching all Inventry");
    res.status(200).json(items);   
    } catch (error) {
        res.status(500).send({'error':error});
    }
}

const currentQty= async (req,res)=>{
    try {
    const itemId = req.params.id;
    const { quantity } = req.body;

    const item = await ItemsInventory.update(
      { quantity: quantity },
      { where: { id: itemId } }
    );

    res.json({ message: "Quantity updated", quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={
    addItems,
    getAllItemsInInventry,
    currentQty
}
