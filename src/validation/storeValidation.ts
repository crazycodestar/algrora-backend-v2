import Joi from "joi";

const createStoreValidation = Joi.object({
	preOrderExp: Joi.date().required(),
	orderExp: Joi.date().required,
});

export { createStoreValidation };
