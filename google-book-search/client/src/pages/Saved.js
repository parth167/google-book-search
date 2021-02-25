import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteBtn from '../components/DeleteBtn';
import { Col, Row, Container } from '../components/Grid';
import { ListItem } from '../components/List';
import API from '../utils/API';

function Saved() {
  const [books, setBooks] = useState([]);

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    API.getBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadData())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          {books.length ? (
            <div>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <img src={book.smallThumbnail} alt={book.title} />
                  <div>
                    <a
                      href={book.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>
                        {book.title}
                        {book.authors ? (
                          <span>
                            {' '}
                            by{' '}
                            {book.authors.map((a, idx) => (
                              <div key={idx}>{a} </div>
                            ))}
                          </span>
                        ) : null}
                      </strong>
                    </a>
                    <p>{book.description}</p>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </div>
                </ListItem>
              ))}
            </div>
          ) : (
            <p>No Results</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Search</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
