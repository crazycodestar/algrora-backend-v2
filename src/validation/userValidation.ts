import Joi from "joi";

const signUpValidation = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	address: Joi.string().min(3).required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export { signUpValidation };
