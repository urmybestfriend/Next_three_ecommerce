const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema (
    {   
        id: {
            type: String,
            unique: true,
            required:true,
            ref: "users",
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "users",
        },
        token: {
            type: String,
            required: true
        },
        revoked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("token", tokenSchema);