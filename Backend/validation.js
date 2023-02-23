const Joi = require("joi");
const { Schema } = require("mongoose");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string()
      .min(6)
      .max(50)
      .regex(/[a-zA-Z0-9]{8,50}$/)
      .required(), // 最小長度8最大50，只允許英文大小寫和數字
    email: Joi.string().min(8).max(255).email().required(),
    contactNo: Joi.number().min(1).max(999999999).required(),
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    gender: Joi.string().valid("M", "F").required(),
    DOB: Joi.date().required(),
    // createAt: Joi.date().default("0/0/1990").required(), //not sure about this one
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(8).max(50).required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .required()
      .regex(/[a-zA-Z0-9]{8,50}$/)
      .required(), // 最小長度8最大50，只允許英文大小寫和數字
  });
  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({
    productName: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    category: Joi.string()
      .valid(
        "Antiques",
        "Art",
        "Books",
        "CDs, DVDs, Games",
        "Computers",
        "Dining",
        "Electronics",
        "Food & Gourmet Items",
        "For Your Pet",
        "Golf & Sports Gear",
        "Handbags",
        "Health & Fitness",
        "Home",
        "Jewelry",
        "Lawn & Garden",
        "Memorabilia",
        "Other",
        "Services",
        "Spa & Beauty",
        "Tickets-Entertainment",
        "Tickets-Sports",
        "Toys",
        "Travel",
        "Unique Experiences",
        "Wine"
      )
      .required(),
    condition: Joi.string().valid("New", "Used").required(),
    price: Joi.number().min(1).maxlength(8).required(), // 1 to 999999999
    images: Joi.array().url(Joi.string).required(),
    // createAt: Joi.date().default(now).required(), //not sure about this
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
