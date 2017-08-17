import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateBook = this.updateBook.bind(this);
    this.updateBookFromSearch = this.updateBookFromSearch.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  state = {
    books: [],
    searchResults: []
  };

  updateBooks() {
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    });
  }

  updateBook(bookId, shelf) {    
    BooksAPI.get(bookId).then( book => {
      BooksAPI.update(book,shelf).then( () => {
        this.updateBooks();
      });
    });
  }

  updateBookFromSearch(bookId,shelf) {
    this.updateBook(bookId, shelf);

    BooksAPI.get(bookId).then( book => {
      let searchResults = this.state.searchResults;
      searchResults.filter( book => book.id === bookId)
        .map( book =>book.shelf = shelf);
      
      this.setState({ searchResults: searchResults });
    });    
  }

  searchBooks(query) {
    if (query) {
      const MAX_SEARCH_RESULT = 20;
      BooksAPI.search(query, MAX_SEARCH_RESULT).then( books => {
        if (books.error) {  // no results
          this.setState({ searchResults: []})
        } else {
          this.setState({ searchResults: this.checkBookshelf(books)});
        }
      });
    } else {
      this.setState({ searchResults: [] });
    }

  }

  checkBookshelf(books) {
    const { currentlyReading, wantToRead, read } = this.categorizeBooks(this.state.books);

    return books.map( book => {
      book.shelf = currentlyReading.filter( book2 => book.id === book2.id).length ? 
        'currentlyReading' :
        wantToRead.filter( book2 => book.id === book2.id).length ?
          'wantToRead' :
          read.filter ( book2 => book.id === book2.id).length ?
            'read' : book.shelf = 'none';
      return book;
    });
  }

  categorizeBooks(books) {
    const currentlyReading = books.filter( book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter( book => book.shelf === 'wantToRead' );
    const read = books.filter( book => book.shelf === 'read' );

    return { currentlyReading, wantToRead, read }
  }

  componentDidMount() {
    this.updateBooks();
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks shelves={this.categorizeBooks(this.state.books)} updateBook={this.updateBook} />
        } />
        <Route path='/search' render={() =>
          <SearchBooks 
            searchBooks={this.searchBooks}
            results={this.state.searchResults}
            updateBook={this.updateBookFromSearch} />
        } />
      </div>
    );
  }
}

export default BooksApp;
