const Joi = require("joi");

const booksSchem = Joi.object({
  bookId: Joi.string().required(),
});

const addBookSchem = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  ISBN: Joi.string().required(),
  genre: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const updateBookSchem = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  ISBN: Joi.string().optional(),
  genre: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});

const bookSearchSchem = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  genre: Joi.string().optional(),
  minPrice: Joi.number().optional(),
  max: Joi.number().optional(),
  Priceavailable: Joi.string().optional(),
});

module.exports = { booksSchem, bookSearchSchem, updateBookSchem, addBookSchem };
