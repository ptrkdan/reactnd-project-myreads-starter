import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  static propTypes = {
    shelves: PropTypes.objectOf(PropTypes.array).isRequired,
    updateBook: PropTypes.func.isRequired
  };
  
  render() {
    let { currentlyReading, wantToRead, read } = this.props.shelves;
    let updateBook = this.props.updateBook;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { 
                    currentlyReading[0] && (
                      currentlyReading.map( (book) => ( 
                        <li key={book.id}>
                          <Book book={book} updateBook={updateBook} />
                        </li>
                      ))
                    )
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { 
                    wantToRead[0] && (
                      wantToRead.map( (book) => ( 
                        <li key={book.id}>
                          <Book book={book} updateBook={updateBook} />
                        </li>
                      ))
                    )
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { 
                    read[0] && (
                      read.map( (book) => ( 
                        <li key={book.id}>
                          <Book book={book} updateBook={updateBook} />
                        </li>
                      ))
                    )
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;