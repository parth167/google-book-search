import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, FormBtn } from '../components/Form';

function Search() {
  const [searched, setSearched] = useState(''); // word sent to search API
  const [result, setResult] = useState([]); // data returned from search API
  const [input, setInput] = useState(''); // search handle change

  useEffect(() => {
    searchBooks(searched);
  }, [searched]);

  function searchBooks(searched) {
    API.searchGoogleBooks(searched)
      .then((res) => {
        const arr = res.data.items;
        const resultArr = arr.map((object) => {
          const {
            id,
            volumeInfo: { title },
            volumeInfo: { authors }, // array
            volumeInfo: { description },
            volumeInfo: {
              imageLinks: { smallThumbnail },
            },
            volumeInfo: { infoLink },
          } = object;
          return { id, title, authors, description, smallThumbnail, infoLink };
        });
        return resultArr;
      })
      .then((data) => {
        setResult(data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (input) {
      setSearched(input);
    }
  }

  function handleSave(event) {
    window.alert('Saving');
    const saveIt = result.filter(
      (bookObject) => event.target.value === bookObject.id
    );
    API.saveBook(saveIt[0]).catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="sm-12">
          <form>
            <div className="form-group m-2">
              <Input
                onChange={handleInputChange}
                name="search"
                placeholder="Search"
              />
              <div className="p-2">
                <FormBtn disabled={!input} onClick={handleFormSubmit}>
                  Search
                </FormBtn>
              </div>
            </div>
          </form>
        </Col>
      </Row>
      <Row>
        <Col size="sm-12">
          <h1>Found</h1>
          {result.length ? (
            <List>
              {result.map((book) => (
                <ListItem key={book.id}>
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
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                    value={book.id}
                  >
                    Save
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

export default Search;
