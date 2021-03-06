import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    searchBooks: PropTypes.func.isRequired,
    updateBook: PropTypes.func.isRequired

  };

  state = {
    query: ''
  };

  updateQuery(query) {
    this.setState({ query });
    this.props.searchBooks(query);
  }

  componentDidMount() {
    this.updateQuery(this.state.query);
  }

  render() {
    const { results, updateBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" 
              value={this.state.query}
              onChange={ event => this.updateQuery(event.target.value) }/>
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { results ? results.map( book => (
              <li key={book.id}>
                <Book book={book} updateBook={updateBook} />
              </li>
            )) : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;