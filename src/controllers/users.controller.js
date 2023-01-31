const Users = require("../models/user.model");
const Tokens = require("../models/token.model");
const bcrypt = require("bcrypt");
const { validateUpdateUser } = require("../validations/auth.validation");


const getAllUsers = async (req, res) =>{
    try{
        let users;
        const { deleted } = req.query;
        if (!deleted){
            users = await Users.find();
        }
        else{
            users = await Users.find({isDeleted: deleted});
        }        
        res.json(users);
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    };
};

const getUserById = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(400).json({error:"User not found"});
        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const getProfile = async (req, res) => {
    try{
        const { userId } = req.payload;
        const user = await Users.findById(userId);
        if (!user) return res.status(400).json({error:"User not found"});
        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await validateUpdateUser.validateAsync(req.body);
        const user = await Users.findByIdAndUpdate(id, {$set: {...data}}, {new:true} );
        await user.save();
        if (user === null) return res.status(400).json({error:"User details not updated"});
        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const updateProfile = async (req, res) => {
    try{
        const { userId } = req.payload;
        const data = await validateUpdateUser.validateAsync(req.body);
        const user = await Users.findByIdAndUpdate(userId, {$set: {...data}}, {new:true} );
        await user.save();
        if (user === null) return res.status(400).json({error:"User details not updated"});
        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const changePassword = async (req, res) => {
    try{
        const { userId } = req.payload;
        const foundUser = await Users.findById(userId).select('+password');
        if (!foundUser) return res.status(400).json({error:"User not found"});
        const { oldpassword, newpassword} = req.body;

        const match = await bcrypt.compare(oldpassword, foundUser.password);
        if (!match) return res.status(404).json({ error: "Invalid Password" });

        foundUser.password = bcrypt.hashSync(newpassword, 12);
        await foundUser.save();
        res.json(foundUser);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const deleteUserById = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if(!user) return res.status(404).json({error: "User not found"})

        user.isDeleted = true;
        await user.save();

        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const approveUserById = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        if(!user) return res.status(404).json({error: "User not found"});

        if(user.isVerified === false) return res.status(400).json({error: "User is not verified"});
        
        user.isApproved = true;
        await user.save();

        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

const changeUserRole = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id);
        const { role } = req.body;
        if(!user) return res.status(404).json({error: "User not found"});
        if (role !== 'admin' && role !== 'user') return res.status(400).json({error:"Invalid role"})
        if (user.role === role) return res.status(400).json({error:"User already has this role"})

        user.role = role;
        await user.save();

        res.json(user);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

module.exports = {
    getAllUsers,
    getUserById,
    getProfile,
    updateUser,
    updateProfile,
    changePassword,
    deleteUserById,
    approveUserById,
    changeUserRole
}