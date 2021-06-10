const joi = require("joi");
const validator = (req, res, next) => {
    const schema = joi.object({
        firstName:joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty":"This field is mandatory",
            "string.min":"Your name must contain at least 2 letters",
            "string.max":"Your name can’t contain more than 20 letters.",
            "string.pattern.base":"This field can only contain letters"
        }),
        lastName:joi.string().trim().min(3).max(20).pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.min":"Your last name must contain at least 3 letters",
            "string.max":"Your last name cannot contain more than 20 letters",
            "string.pattern.base":"This field can only contain letters"
        }),
        email:joi.string().trim().email().required().messages({
            "string.email":"Enter a valid email address",
            "string.empty":"This field is mandatory",
        }),
        password:joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty":"This field is mandatory",
            "string.pattern.base": "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number",
            "string.min": "Your password must be at least 6 characters long"
        }),
        userImg:joi.allow(""),
        /*userImg:joi.string().required().uri().messages({
            "string.uri": "Enter a valid URL",
            "string.empty":"Enter a valid URL"
        }),*/
        loggedWithGoogle: joi.boolean(),
        
    })
    const validation = schema.validate(req.body, {abortEarly:false})
    
    if(validation.error){
        const errors = validation.error.details.map(error => ( {message:error.message,label: error.context.label}))
        return res.json({success:false,error:{errors}})
    }
  next();
};
module.exports = validator;
