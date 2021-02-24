import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';
import Detail from './Detail';
function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    const { name, value } = event.target;
    const description = event.target.attributes.getNamedItem('data-description')
      .value;
    const title = event.target.attributes.getNamedItem('data-title').value;
    const infolink = event.target.attributes.getNamedItem('data-infolink')
      .value;
    const author = event.target.attributes.getNamedItem('data-author').value;
    const image = event.target.attributes.getNamedItem('data-image').value;

    API.saveBook({
      title: title,
      authors: author,
      image: image,
      description: description,
      link: infolink,
    })
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  function handleFormSearch(event) {
    event.preventDefault();
    API.searchBook(formObject.title)
      .then((res) => {
        console.log(res);
        console.log(res.items);
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Google book lookup</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />

            <FormBtn onClick={handleFormSearch}>Submit Book</FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Google Books returned</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem
                  key={book.id}
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                >
                  <strong>
                    {book.volumeInfo.infoLink !== undefined ? (
                      <a href={book.volumeInfo.infoLink} target="_blank">
                        {book.volumeInfo.title} by{' '}
                        {book.volumeInfo.authors
                          ? book.volumeInfo.authors[0]
                          : ''}
                      </a>
                    ) : (
                      '_target'
                    )}
                  </strong>
                  {book.volumeInfo.description}
                  <br />
                  <img
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ''
                    }
                  />
                  <br />
                  <button
                    data-title={book.volumeInfo.title}
                    data-description={
                      book.volumeInfo.description
                        ? book.volumeInfo.description
                        : ''
                    }
                    data-infolink={
                      book.volumeInfo.infoLink ? book.volumeInfo.infoLink : ''
                    }
                    data-author={
                      book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''
                    }
                    data-image={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ''
                    }
                    data-value={book.volumeInfo}
                    onClick={handleFormSubmit}
                  >
                    Submit Book
                  </button>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
