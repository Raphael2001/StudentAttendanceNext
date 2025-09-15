import Joi from "joi";

const VALIDATION_SCHEMES = {
	RequiredString: Joi.string().empty("").required(),
	String: Joi.string().empty(""),
	Password: Joi.string()
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
		.empty("")
		.required()
		.min(6),
	Username: Joi.string().empty("").required().alphanum().min(2).max(30),
	Email: Joi.string()
		.email({ tlds: { allow: false } })
		.empty("")
		.required()
		.min(2)
		.max(30),
	Title: Joi.string().empty("").min(2).max(30).required(),
	RequiredNumber: Joi.number().required(),
	RequiredArray: Joi.array().min(1).required(),
	GeneralInfoName: Joi.string()
		.min(2)
		.max(30)
		.custom((value, helpers) => {
			const isValid = /^[a-zA-Z0-9-_]+$/.test(value);
			if (!isValid) {
				return helpers.error("generalInfoName.invalid");
			}
			return value;
		})
		.required(),
	Boolean: Joi.boolean(),
	File: Joi.object({
		name: Joi.string(),
		type: Joi.string(),
		size: Joi.number().integer(),
		lastModified: Joi.number().integer().required(),
	}).unknown(true),
	NoValidation: Joi.any().empty(""),
};

export default VALIDATION_SCHEMES;
