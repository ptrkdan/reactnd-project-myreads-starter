import React from 'react';

function Book(props) {
  const { book, updateBook } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
        <div className="book-shelf-changer">
          <select onChange={ event => {
            updateBook(book.id, event.target.value);
          }}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading" selected={book.shelf === 'currentlyReading' ? 'selected' : ''}>Currently Reading</option>
            <option value="wantToRead" selected={book.shelf === 'wantToRead' ? 'selected' : ''}>Want to Read</option>
            <option value="read" selected={book.shelf === 'read' ? 'selected' : ''}>Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
  );
}

export default Book;