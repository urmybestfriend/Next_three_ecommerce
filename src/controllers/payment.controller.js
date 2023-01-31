// const Stripe = require('stripe');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Products = require("../models/product.model");
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");

const getAllPayments = async (req, res) =>{
    try{
        const payments = await Payment.find();;
        res.json(payments);
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    };
};

const createCheckoutSession = async (req, res) =>{
    try{
        const { userId } = req.payload;
        const session = await stripe.checkout.sessions.create(req.body);
        const inputData = req.body;
        const due_date = new Date(session.expires_at).toLocaleDateString("en-US")
        const data  = {
            "id": session.id,
            "user": userId,
            "totalAmount": session.amount_total,
            "checkout_url":session.url,
            "payment_status": session.payment_status,
            "status": session.status,
            "due_date": due_date
        }            
        const order = await Order.findById(inputData.metadata.order);
     
        const payment = new Payment(data);
        payment.order = order;
        await payment.save();
        res.json(payment);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getCheckoutSesssion = async (req, res)=> {
    try{
        const session = await stripe.checkout.sessions.retrieve(req.params.id);
        res.json(session)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const updateStatusOnSuccess = async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.retrieve(req.body.checkoutId);
        let payment = Payment.findOne({id: req.body.checkoutId});
        if(!payment) return res.status(404).json({error:"Payment details does not exist"});
        let product = Products.findOne({name: payment.product});
        if( session.paymenet_status === "paid"){
            payment.update({status: session.paymenet_status});
            new_quantity = product.quantity - payment.quantity;
            product.update({quantity:new_quantity})
        }
        res.json(payment);

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

module.exports = {
    createCheckoutSession,
    updateStatusOnSuccess,
    getCheckoutSesssion,
    getAllPayments
}