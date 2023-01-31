const { loginValidation, validateUser } = require("../validations/auth.validation");
const Users = require("../models/user.model");
const Tokens = require("../models/token.model");
const bcrypt = require("bcrypt");
const {sendEmail, generateTokens, hashToken, generateResetPasswordEmailText, generateVerifyEmailText, generatePasswordEmailText } = require("../utils/auth.util");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const login = async (req, res) => {
  try {
    const { email, password } = await loginValidation.validateAsync(req.body);

    const foundUser = await Users.findOne({
      email,
      // password,
    }).select("+password");

    if (!foundUser || foundUser.isDeleted === true) return res.status(404).json({ error: "User does not exist!" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ error: "Invalid Password" });

    if (foundUser.isApproved == false || foundUser.isVerified == false) return res.status(403).json({error:"User is not verified or approved"})

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(foundUser, jti);
    const data = {
      "id": jti,
      "token": hashToken(refreshToken),
      "userId": foundUser._id

    };
    const token = new Tokens(data);
    await token.save();

    res.json({
      accessToken,
      refreshToken,
      user: foundUser
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try{
    let token;
    const { error } = await validateUser.validateAsync(req.body);
    if(error) return res.status(400).json({error: error.message});

    let foundUser= await Users.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).json({error: "User already exists"})
    foundUser = new Users(req.body)
    foundUser.password = bcrypt.hashSync(foundUser.password, 12);
    await foundUser.save();
    const jti = uuidv4();

    const { accessToken, refreshToken } = generateTokens(foundUser, jti);
    token = hashToken(refreshToken);
    const text = await generateVerifyEmailText(token, foundUser._id);
    await sendEmail(foundUser.email, "Verify Email", text);
    const data = {
      "id": jti,
      "token": hashToken(refreshToken),
      "userId": foundUser._id
      }
      token = new Tokens(data);
      await token.save()
      res.status(201).json({message: "Account created. Please check your email to verify your account."});
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
};

const createUser = async (req, res ) => { 
  try {
    let token;
    const { firstName,lastName,email,country,phone,company,role,city,zip } = req.body;
    if (!email) {
      res.status(400).json({error:"Please provide email"});
    }
    const existingUser = await Users.findOne({email});
    if (existingUser) return res.status(400).json({error:"Email already in use."});
    
    password = `@This${crypto.randomBytes(3).toString('hex')}`;
    const user = new Users({firstName,lastName,email,company, password,country,phone,role,city,zip});
    
    user.password = bcrypt.hashSync(user.password, 12);
    await user.save();
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    token = hashToken(refreshToken);

    const text = await generatePasswordEmailText(email,password,token, user._id)
    await sendEmail(user.email, "Henning Credentials", text);
    const data = {
      "id": jti,
      "token": hashToken(refreshToken),
      "userId": user._id
      }
      token = new Tokens(data);
      await token.save()
    res.status(201).json({message: `Account created and email sent to ${email} `});
    } catch (error) {
      res.status(400).json({error: error.message});
  }
 
};

const verifyEmail = async (req, res) =>{
  try{
    const { userId } = req.query;
    const foundUser = await Users.findOne({_id: userId});

    if(!foundUser) return res.status(400).json({error: "User Not found"});
    const token = await Tokens.findOne({
      userId: foundUser._id,
      token: req.query.token

    });
    if(!token) return res.status(400).json({error: "Invalid link"});

    const updateUser = await Users.findByIdAndUpdate(userId, {isVerified: true});
    if( updateUser === null) return res.status(400).json({error: "Email was not verified"});

    const updateToken = await Tokens.findByIdAndRemove(token._id);
    if( updateToken === null) return res.status(400).json({error: "Could not find token"});

    res.json({"message": "email verified successfully"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const forgotPassword = async( req, res) => {
  try {
    let token;
    const { email } = req.body;
    const foundUser = await Users.findOne({
      email : email
    });

    if (!foundUser) return res.status(403).json({error: "Invalid email"})
    
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(foundUser, jti);
    const new_token = hashToken(refreshToken);
    const data = {
      "id": jti,
      "token": new_token,
      "userId": foundUser._id
    }
    token = new Tokens(data);
    await token.save()
    const text = await generateResetPasswordEmailText(refreshToken);
    sendEmail(email, "Password Reset", text);
 
    res.json({"message":`Email sent sucessfully to ${email}`})
  } catch (error){
    return res.status(400).json({ error: error.message});
  }
};

const resetPassword = async (req, res) => {
  try{
    const { token, newpassword } = req.body;
    if(!token) return res.status(400).json({ error: "Missing token."});

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'fallbackjwtrefreshsecret');

    const jti = payload.jti;

    const savedToken = await Tokens.findOne({
      id: jti
    });
    if(!savedToken || savedToken.revoked == true) return res.status(401).json({ error: "Unauthorized"});

    const hashedToken = hashToken(token);
    if(hashedToken !== savedToken.token) return res.status(401).json({ error: "Unauthorized"});

    const { userId } = savedToken;
    const foundUser = await Users.findOne({
      _id: userId
    });
    if(!foundUser) return res.status(401).json({ error: "User not found"})

    foundUser.password = bcrypt.hashSync(newpassword, 12);
    await foundUser.save();
    await savedToken.updateOne({revoked:true});
    const new_jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(foundUser, new_jti)
    res.json({"message": "Password reset successful."},accessToken, refreshToken)
  } catch (error) {
    return res.status(400).json({ error: error.message});
  };
};

const genAccessTokenFromRefresh = async (req, res) => {
  try{
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({error:"Missing refresh token"})

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallbackjwtrefreshsecret');
    const savedToken = await Tokens.findOne({
      id: payload.jti
    });

    const foundUser = await Users.findById(payload.userId);

    if(!foundUser) return res.status(401).json({error:"Unauthorized"});

    if(!savedToken || savedToken.revoked === true ) return res.status(401).json({error:"Unauthorized"});
    
    const hashedToken = hashToken(refreshToken);

    if(hashedToken !== savedToken.token){
      res.status(401).json({error: "Unauthorized"});
    }

    await savedToken.updateOne({revoked: true});

    const jti = uuidv4();
    console.log('neggfjhfk', jti);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(foundUser, jti);
    const data = {
      "id":jti,
      "token": hashedToken,
      "userId": foundUser._id
    }
    await new Tokens(data).save();

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    })
  } catch(error) {
    return res.status(400).json({error: error.message});
  }
};

const revokeRefreshToken = async (req, res) => {
  try{
    const { userId } = req.body;
    await Tokens.updateMany({userId, revoked:true});
    res.json({ message: `Tokens revoked for user with id ${userId}`});

  } catch (error){
    res.status(400).json({error: error.message})
  };
};

module.exports = { 
  login,
  register,
  forgotPassword,
  resetPassword,
  genAccessTokenFromRefresh,
  revokeRefreshToken,
  verifyEmail,
  createUser
 };
