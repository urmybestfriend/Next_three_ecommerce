const path = require("path")
const updown = async (req, res) =>{
    try{
        const dir = __dirname;
        const updownpath = path.join(dir, "../examples/updown/index.html");
        console.log({updownpath})
        res.sendFile(updownpath)
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    };
};
module.exports = {
    updown
}