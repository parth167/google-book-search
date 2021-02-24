import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { List, ListItem } from '../components/List';
function Detail(props) {
  const [book, setBook] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();
  useEffect(() => {
    API.getBook(id)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, []);
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12"></Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <List>
            {book.map((bookie) => (
              <ListItem key={bookie._id}>
                <strong>
                  <a href={bookie.link} target="_blank">
                    {bookie.title} by {bookie.authors}
                  </a>
                </strong>
                <DeleteBtn onClick={() => deleteBook(bookie._id)} />
              </ListItem>
            ))}
          </List>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Titles</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
