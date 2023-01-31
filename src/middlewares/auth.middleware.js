const ApiKeys = require("../models/api_key.model");
const jwt = require("jsonwebtoken");
const Tokens = require("../models/token.model");
const { hashToken } = require("../utils/auth.util");

const validateApiKey = async (req, res, next) => {
  try {
    const api_key = req.headers.x_api_key;
    if (!api_key) {
      return res
        .status(400)
        .json({ error: "Authentication failed. Provide api key!" });
    }

    const data = await ApiKeys.findOne({ api_key, expiry_date : { $gt: new Date() } });
    if (!data) {
      return res
        .status(404)
        .json({ error: "Authentication failed. Invalid api key!" });
    }
    next();
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: { message: error.message, code: error?.code, error } });
  }
};

const isAuthenticated = (req, res, next) => {
  try{
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({error: "Unauthorized"});

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({error: error.message});
  };
};

const userHasValidSession = async (req, res, next) => {
  try {
    const ref_token = req.params.userid;
    const hash = hashToken(ref_token)
    const foundsession = await Tokens.findOne({token: hash});
    console.log({hash})
    if(!foundsession) return res.status(401).json({error: "You need to log in first"}); 
    return next()
  } catch (error) {
    return res.status(401).json({error: error.message});
  }
}

const isAdmin = (req, res, next) => {
  try{
    const { role } = req.payload;
    if(role !== "admin") return res.status(403).json({error:'Access denied.'})
    return next()
  } catch (error) {
    return res.status(401).json({error: error.message});
  };
};
module.exports = { 
  validateApiKey,
  isAuthenticated,
  isAdmin,
  userHasValidSession
  };
