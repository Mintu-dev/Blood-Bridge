import Joi from "joi";

 const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(2).max(20).required(),

    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(30)
      .required(),

    gender: Joi.string()
      .valid("Male", "Female", "Rather not to disclose")
      .required(),

    dob: Joi.date()
      .less("now")   // future date allow nahi karega
      .required(),

    bio: Joi.string()
      .max(200)
      .allow("", null) // optional field
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};


 const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .messages({
        "string.empty": "Username is required",
      }),

    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};



const donorValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(50).trim().required(),

    email: Joi.string().email().lowercase().trim().required(),

    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be 10 digits",
      }),

    gender: Joi.string()
      .valid("Male", "Female", "Other")
      .required(),

    dob: Joi.date()
      .less("now")
      .required()
      .messages({
        "date.less": "DOB must be in the past",
      }),

    bloodGroup: Joi.string()
      .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
      .required(),

    address: Joi.object({
      street: Joi.string().min(3).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().min(2).required(),
      pincode: Joi.string()
        .pattern(/^[0-9]{6}$/)
        .required()
        .messages({
          "string.pattern.base": "Pincode must be 6 digits",
        }),
    }).required(),

    weight: Joi.number().min(40).max(150).required(),

    height: Joi.number().min(120).max(220).required(),

    // 👇 IMPORTANT FIX
    lastDonationDate: Joi.date()
      .less("now")
      .allow(null)   // 🔥 null allow kiya
      .optional()
      .messages({
        "date.less": "Last donation date must be in the past",
      }),

    anyMedicalConditions: Joi.array()
      .items(Joi.string().trim())
      .default([]),   // 🔥 default empty array
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,     // 🔥 sab errors ek saath
    stripUnknown: true,    // 🔥 extra fields remove
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map(err => err.message), // 🔥 multiple errors
    });
  }

  req.body = value; // 🔥 cleaned data use karo

  next();
};


export {registerValidation , loginValidation , donorValidation};