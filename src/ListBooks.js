import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';

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
            <Bookshelf 
              bookshelfTitle='currentlyReading'
              bookList={currentlyReading}
              updateBook={updateBook}
            />
            <Bookshelf 
              bookshelfTitle='wantToRead'
              bookList={wantToRead}
              updateBook={updateBook}
            />            
            <Bookshelf 
              bookshelfTitle='read'
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
}

export default ListBooks;