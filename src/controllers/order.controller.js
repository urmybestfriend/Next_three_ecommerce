const Order = require("../models/order.model");
const Product = require("../models/product.model");
const bcrypt = require("bcrypt");
const { validateUpdateOrder, orderValidation } = require("../validations/order.validation");


const getAllOrder = async (req, res) =>{
    try{
        const orders = await Order.find();;
        res.json(orders);
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    };
};

const createOrder = async (req, res) => {
    try{
        const { userId } = req.payload;
        const data = await orderValidation.validateAsync(req.body, {convert:false});
        const order = new Order(data);
        order.user = userId;

        const f= await data.items.map( async (item, i)=>{ 
            const new_prod = item.product;
            const a = await Product.findById(new_prod);
            
            if (!a) return res.status(400).json({error:"Product not found"});
            if (a.quantity < item.quantity || a.quantity === 0){
                item.quantity = a.quantity;
                item.message = `There is only ${a.quantity} of ${a.name} remaining`
                // return res.status(400).json({error: `Out of stock. There is only ${a.quantity} of ${a.name} remaining`});
            };
            item.totalPrice = a.price * item.quantity;
            });

        await order.save();
        const d = order.items.map( (item, i) => {
            return item.totalPrice;
        })
        const sum = d.reduce((a,b) => a+b,0);
        order.totalAmount = sum;
        await order.save();
        res.json(order);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(400).json({error:"Item not found"});
        res.json(order);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getOrderByUserId = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(400).json({error:"Item not found"});
        res.json(order);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const updateOrder = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await validateUpdateOrder.validateAsync(req.body, {convert:false});
        const order = await Order.findByIdAndUpdate(id, {$set: {...data}}, {new:true} );
        await order.save();
        if (order === null) return res.status(400).json({error:"Order not updated"});
        res.json(order);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const deleteOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({error: "Item not found"})
        await order.deleteOne()

        res.status(204).json(`Item ${order.product} deleted successfully`);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

module.exports = {
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrderById, 
    createOrder,
    getOrderByUserId
}