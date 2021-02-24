import axios from 'axios';
const BASEURL = 'https://www.googleapis.com/books/v1/volumes?q='; //?key=AIzaSyC7S5uOXG1DVFHgYJS40Gt3Tx1eI7SVBl0";
const rest = '';
export default {
  // Gets all books

  searchBook: function (searchTerm) {
    return axios.get(BASEURL + searchTerm + rest);
  },
  getBooks: function () {
    return axios.get('/api/books');
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get('/api/books/' + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete('/api/books/' + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post('/api/books', bookData);
  },
};
