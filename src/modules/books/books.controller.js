const booksData = require("../../models/books");

const getBooksList = async (req, res) => {
  try {
    let booksList = await booksData.find();
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: booksList,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const getBooksDetails = async (req, res) => {
  try {
    const { bookId } = req.params;
    let booksDetails = await booksData.findOne({ _id: bookId });
    if (!booksDetails) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
        message: "books details not found",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: booksDetails,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, genre, price, quantity } = req.body;
    let bookDetails = await booksData.findOne({ title });
    if (bookDetails) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
        message: "books title already present",
      });
    }
    let createObj = {
      title: title,
      author: author,
      ISBN: ISBN,
      genre: genre,
      price: price,
      quantity: quantity,
    };
    let addBook = new booksData(createObj);
    addBook.save();
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "books add successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const updatebook = async (req, res) => {
  try {
    const { id, title, author, ISBN, genre, price, quantity } = req.body;
    let bookDetails = await booksData.findOne({ _id: id });
    if (!bookDetails) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
        message: "book not present",
      });
    }
    let obj = {
      title: title || bookDetails.title,
      author: author || bookDetails.athor,
      ISBN: ISBN || bookDetails.ISBN,
      genre: genre || bookDetails.genre,
      price: price || bookDetails.price,
      quantity: quantity || bookDetails.quantity,
    };
    await booksData.updateOne({ _id: id }, obj);
    let updateBook = await booksData.findOne({ _id: id });
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "books update successfully",
      data: updateBook,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { bookId } = req.params;
    let bookDetails = await booksData.findOne({ _id: bookId });
    if (!bookDetails) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
        message: "book not found",
      });
    }
    let book = await booksData.deleteOne({ _id: bookId });
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "books delete successfully",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const searchBook = async (req, res) => {
  try {
    let query = {};
    if (req.query.title) {
      query.title = { $regex: req.query.title };
    }
    if (req.query.author) {
      query.author = {
        $regex: req.query.author,
      };
      console.log(query);
    }
    if (req.query.genre) {
      query.genre = { $regex: req.query.genre };
    }
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else {
      if (req.query.minPrice) {
        query.price = {
          $gte: req.query.minPrice,
        };
      } else if (req.query.maxPrice) {
        query.price = {
          $lte: req.query.maxPrice,
        };
      }
    }
    if (req.query.available) {
      query.quantity = { $gt: 0 };
    }
    const bookList = await booksData.find(query);
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: bookList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getBooksList,
  getBooksDetails,
  createBook,
  updatebook,
  deleteBooks,
  searchBook,
};
