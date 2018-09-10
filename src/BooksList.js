import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const BooksList = (props) => {
  const {books, moveBook} = props

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            books={books.filter((book) => 'currentlyReading' === book.shelf)}
            title="Currently Reading"
            moveBook={moveBook}
          />
          <Shelf
            books={books.filter((book) => 'wantToRead' === book.shelf)}
            title="Want to Read"
            moveBook={moveBook}
          />
          <Shelf
            books={books.filter((book) => 'read' === book.shelf)}
            title="Read"
            moveBook={moveBook}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default BooksList
