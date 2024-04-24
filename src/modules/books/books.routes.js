const express = require("express");
const { validators, ValidationSource } = require("../../middlewares/validator");
const { roleList } = require("../../middlewares/rolesList");
const { authMiddleware } = require("../../middlewares/auth");
const {
  getBooksList,
  getBooksDetails,
  createBook,
  updatebook,
  deleteBooks,
  searchBook,
} = require("./books.controller");
const { booksSchem, addBookSchem, updateBookSchem, bookSearchSchem } = require("./books.schema");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const booksRouter = express.Router();
booksRouter.get(
  "/books",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  getBooksList
);

booksRouter.get(
  "/books/:bookId",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  validators(booksSchem, ValidationSource.PAREM),
  getBooksDetails
);

booksRouter.post(
  "/books",
  authMiddleware,
  verifyRoles(roleList.ADMIN),
  validators(addBookSchem),
  createBook
);
booksRouter.patch(
  "/books",
  authMiddleware,
  verifyRoles(roleList.ADMIN),
  validators(updateBookSchem),
  updatebook
);
booksRouter.delete(
  "/books/:bookId",
  authMiddleware,
  verifyRoles(roleList.ADMIN),
  validators(booksSchem, ValidationSource.PAREM),
  deleteBooks
);
booksRouter.get(
  "/searchBook",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  validators(bookSearchSchem,ValidationSource.QUERY),
  searchBook
);
module.exports = { booksRouter };
