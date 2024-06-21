const Book = require('../models/book-model');
const HttpError = require('../models/http-error-model');

////////// POST //////////
const createBook = async (req, res, next) => {
  const {
    title,
    author,
    imagePath,
    genre,
    description,
    seriesName,
    seriesNumber,
    format,
    owned,
    progress,
    favorite,
    whereToGet,
    wishlist,
  } = req.body;
  let book;

  try {
    book = await Book.create({
      title,
      author,
      imagePath,
      genre,
      description,
      seriesName,
      seriesNumber,
      format,
      owned,
      progress,
      favorite,
      whereToGet,
      wishlist,
    });
  } catch (err) {
    const error = new HttpError(
      'Creating book failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json(book);
};

////////// GET //////////
// ALL //
const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching books failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json(books);
};

exports.createBook = createBook;
exports.getAllBooks = getAllBooks;
