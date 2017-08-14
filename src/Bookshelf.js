import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    bookshelfTitle: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  render() {
    let { bookshelfTitle, bookList, updateBook } = this.props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ bookshelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { 
              bookList[0] && (
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
}

export default Bookshelf;