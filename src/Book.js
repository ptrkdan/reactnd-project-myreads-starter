import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const { book, updateBook } = props;
  const thumbnail = book.imageLinks && book.imageLinks.thumbnail;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
        <div className="book-shelf-changer">
          <select value="default"
            onChange={ event => {
              updateBook(book.id, event.target.value);
            }
          }>
            <option value="default" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
    </div>
  );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };

export default Book;