const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  description: String,
  smallThumbnail: String,
  infoLink: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
