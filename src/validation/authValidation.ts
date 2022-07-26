import Joi from "joi";

const loginValidation = Joi.object({
	userUnique: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export { loginValidation };
