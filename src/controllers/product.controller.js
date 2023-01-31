const Products = require("../models/product.model");
// const Tokens = require("../models/token.model");
const bcrypt = require("bcrypt");
const { validateUpdateProduct, productValidation } = require("../validations/product.validation");


const getAllProducts = async (req, res) =>{
    try{
        const products = await Products.find();;
        res.json(products);
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    };
};

const createProduct = async (req, res) => {
    try{
        const data = await productValidation.validateAsync(req.body, {convert:false});
        let product = await Products.findOne({name: data.name} );

        if (product) return res.status(400).json({error: "Product already exists"})
        product = new Products(data);
        await product.save();

        res.json(product);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getProductById = async (req, res) => {
    try{
        const product = await Products.findById(req.params.id);
        if (!product) return res.status(400).json({error:"Product not found"});
        res.json(product);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const updateProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await validateUpdateProduct.validateAsync(req.body, {convert:false});
        const product = await Products.findByIdAndUpdate(id, {$set: {...data}}, {new:true} );
        if (!product) return res.status(400).json({error:"Product not found"});
        await product.save();
        if (product === null) return res.status(400).json({error:"Product not updated"});
        res.json(product);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const deleteProductById = async (req, res) => {
    try{
        const product = await Products.findById(req.params.id);
        if(!product) return res.status(404).json({error: "Product not found"})
        await product.deleteOne()

        res.status(204).json(`Product ${product.name} deleted successfully`);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById, 
    createProduct
}