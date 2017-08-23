import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

function ListBooks(props) {
  const { currentlyReading, wantToRead, read } = props.shelves;
  const updateBook = props.updateBook;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf 
            bookshelfTitle='Currently Reading'
            bookList={currentlyReading}
            updateBook={updateBook}
          />
          <Bookshelf 
            bookshelfTitle='Want To Read'
            bookList={wantToRead}
            updateBook={updateBook}
          />            
          <Bookshelf 
            bookshelfTitle='Read'
            bookList={read}
            updateBook={updateBook}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  shelves: PropTypes.objectOf(PropTypes.array).isRequired,
  updateBook: PropTypes.func.isRequired
}

export default ListBooks;