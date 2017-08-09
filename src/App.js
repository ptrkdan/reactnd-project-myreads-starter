import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateBook = this.updateBook.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    },
    searchResults: []
  };

  updateShelves() {
    BooksAPI.getAll().then( books => {
      this.setState({ shelves: { 
        currentlyReading: books.filter( book => 
          book.shelf === 'currentlyReading'
        ),
        wantToRead: books.filter ( book => 
          book.shelf === 'wantToRead'
        ),
        read: books.filter ( book => 
          book.shelf === 'read'
        )
      }});
    });
  }

  updateBook(bookId, shelf) {    
    BooksAPI.get(bookId).then( book => {
      BooksAPI.update(book,shelf).then( () => {
        this.updateShelves();    
      });
    });
  }

  searchBooks(query) {
    const MAX_SEARCH_RESULT = 20;
    BooksAPI.search(query, MAX_SEARCH_RESULT).then( books => {
      if (books.error) {
        this.setState({ searchResults: []})
      } else {
      console.log("query: " + query);
      console.log(books);
      this.setState({ searchResults: books});
      }
    })

  }

  componentDidMount() {
    this.updateShelves();
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks shelves={this.state.shelves} updateBook={this.updateBook} />
        } />
        <Route path='/search' render={() =>
          <SearchBooks 
            searchBooks={this.searchBooks}
            results={this.state.searchResults}
            updateBook={this.updateBook} />
        } />
      </div>
    );
  }
}

export default BooksApp;
