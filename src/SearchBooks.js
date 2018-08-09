import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

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

    const {books} = this.props

    BooksAPI.search(query).then((showingBooks) => {

      if (Array.isArray(showingBooks)) {

        this.setState({
          showingBooks: showingBooks.map((b) => {
            for (let i = 0, len = books.length; i < len; i++) {
              if (b.id === books[i].id) {
                return books[i]
              }
            }
            b.shelf = 'none'
            return b
          })
        })

      } else {
        this.setState({showingBooks: []})
      }

    })
  }

  render() {
    return (
      <div className="search-books">
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
