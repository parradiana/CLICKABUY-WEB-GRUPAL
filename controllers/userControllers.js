const User = require("../models/UserModel");
const bcryptsjs = require("bcryptjs");
const jwToken = require("jsonwebtoken");
const fs = require("fs");
let cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'clickabuy',
    api_key: process.env.CLOUDINNARY_API_KEY,
    api_secret: process.env.CLOUDINNARY_API_SECRET
});

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error,
    });
};
const errorBackend = "error 500 , avisar al  team backend";
const errorUserNotFound = "error: User not found";

const userControllers = {
    addUser: async (req, res) => {
        let response, error;
        let { email, password, loggedWithGoogle, userImg } = req.body;

        loggedWithGoogle = JSON.parse(loggedWithGoogle);
        let extensionImg;

        if (!loggedWithGoogle) {
            userImg = req.files.userImg;
            extensionImg = userImg.name.split(".")[userImg.name.split(".").length - 1];
        }
        console.log(req.files)
        console.log(req.body)
        try {
            let objImage = { url: "", publicId: "" }

            let userExist = await User.findOne({ email });
            if (!userExist) {
                password = bcryptsjs.hashSync(password, 10);
                let newUser = new User({ ...req.body, password });
                if (!loggedWithGoogle) {
                    //guardo la imagen localmente para luego hostearla
                    //let fileName = `user-${newUser._id}.${extensionImg}`;
                    let filePath = `${__dirname}/../frontend/public/assets/usersImg/newImageUser.${extensionImg}`;
                    await userImg.mv(filePath);
                    let imageHost = await cloudinary.uploader.upload(`${__dirname}/../frontend/public/assets/usersImg/newImageUser.${extensionImg}`);

                    //borro para que no quede una imagen
                    fs.unlink(filePath, (err) => console.log(err));

                    objImage.url = imageHost.secure_url;
                    objImage.publicId = imageHost.public_id;
                }
                else {
                    if (userImg === "") throw new Error('error , loggedWithGoogle = true and userImg = ""');
                    objImage.url = userImg;
                }

                newUser.userImg = objImage;
                await newUser.save();
                let token = jwToken.sign({ ...newUser }, process.env.SECRET_OR_KEY);
                response = {
                    ...newUser.toObject(),
                    _id: undefined,
                    password: undefined,
                    token,
                };
            } else {
                error = "This email is already in use, choose another";
            }
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    addUserNative: async (req, res) => {
        let response, error;
        let { email, password, loggedWithGoogle, userImg } = req.body;
        if(!userImg) userImg = "";
        loggedWithGoogle = JSON.parse(loggedWithGoogle);
    
        try {
            let objImage = { url:userImg , publicId: "" }
            let userExist = await User.findOne({ email });
            if (!userExist) {
                password = bcryptsjs.hashSync(password, 10);
                let newUser = new User({ ...req.body, password });
                newUser.userImg = objImage;
                await newUser.save();
                let token = jwToken.sign({ ...newUser }, process.env.SECRET_OR_KEY);
                response = {
                    ...newUser.toObject(),
                    _id: undefined,
                    password: undefined,
                    token,
                };
            } else {
                error = "This email is already in use, choose another";
            }
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getAllUsers: async (req, res) => {
        let response, error;
        try {
            response = await User.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getUserById: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findById(id);
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    updateUser: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findByIdAndUpdate(id, req.body, { new: true });
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    deleteUser: async (req, res) => {
        let response, error;
        let id = req.params.id;

        try {
            let user = await User.findById(id);

            if (!user) throw new Error("id not found on Collection Users");
            if (!user.loggedWithGoogle) {
                /*fs.unlink(`${__dirname}/../frontend/public/assets/${user.userImg}`, (err) =>
                    console.log(err)
                );*/
                await cloudinary.api.delete_resources([user.userImg.publicId]);

            }

            response = await User.findByIdAndRemove(id);
        } catch (err) {
            console.log(err);
            error = err.message;
        }
        respondFrontend(res, response, error);
    },

    loginUser: async (req, res) => {
        let response, error;
        let { email, password } = req.body;
        try {
            let userExist = await User.findOne({ email });
            if (userExist) {
                //aqui va lo de google
                if (bcryptsjs.compareSync(password, userExist.password)) {
                    let token = jwToken.sign({ ...userExist }, process.env.SECRET_OR_KEY);
                    response = {
                        ...userExist.toObject(),
                        _id: undefined,
                        token,
                    };
                } else error = "Please provide a valid email and password ";
            } else error = "Please provide a valid email and password ";
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    forcedLogin: async (req, res) => {
        let response = {
            ...req.user.toObject(),
            _id: undefined,
            password: undefined,
        };

        respondFrontend(res, response, undefined);
    },

    userCheckRole: async (req, res) => {
        let response, error;
        let userId = req.user._id;

        try {
            let userSearched = await User.findById(userId);
            response = userSearched.role
        } catch (err) {
            console.log(err);
            error = err.message;
        }
        respondFrontend(res, response, error);
    },
};

module.exports = userControllers;
