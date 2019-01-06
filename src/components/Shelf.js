import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Shelf = (props) => {
  const {books} = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        <span>{props.title}</span>
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} moveBook={props.moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default Shelf
