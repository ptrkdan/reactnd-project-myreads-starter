import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function Bookshelf(props) {
  const { bookshelfTitle, bookList, updateBook } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ bookshelfTitle }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { 
            bookList && (
              bookList.map( (book) => ( 
                <li key={book.id}>
                  <Book book={book} updateBook={updateBook} />
                </li>
              ))
            )
          }
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  bookshelfTitle: PropTypes.string.isRequired,
  bookList: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}

export default Bookshelf;