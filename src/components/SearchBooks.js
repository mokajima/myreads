import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import './SearchBooks.css'

class SearchBooks extends React.Component {
  state = {
    query: '',
    showingBooks: []
  }

  /**
  * @description Update the state based on user inputs
  * @param {object} event - The event object
  */
  handleChange = (event) => {
    this.updateQuery(event.target.value)
    this.updateShowingBooks(event.target.value)
  }

  /**
  * @description Update this.state.query
  * @param {string} query
  */
  updateQuery = (query) => {
    this.setState({query})
  }

  /**
  * @description Update this.state.showingBooks
  * @param {string} query
  */
  updateShowingBooks = (query) => {

    // Get all books in bookshelves
    const { books } = this.props

    // Get books to show
    BooksAPI.search(query)
      .then((showingBooks) => {

        // Books are found
        if (Array.isArray(showingBooks)) {

          this.setState({
            showingBooks: showingBooks.map((b) => {
              for (let i = 0, len = books.length; i < len; i++) {
                if (b.id === books[i].id) {

                  // Return books[i] instead of b
                  // because books[i] has a shelf property
                  // but b doesn't
                  return books[i]
                }
              }

              // If books[i] is not found, b is not in a shelf
              b.shelf = 'none'
              return b
            })
          })

        } else {

          // No books are found
          this.setState({showingBooks: []})
        }
      })
  }

  render() {
    return (
      <div className="search-books">
        <Helmet>
          <title>Search | MyReads</title>
        </Helmet>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.showingBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} moveBook={this.props.moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default SearchBooks
