import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
  const {book} = props

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks && (
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail}`
            }}
          />
        )}
        <div className="book-shelf-changer">
          <select
            value={book.shelf}
            onChange={(event) => props.moveBook(book, event.target.value)}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.name}</div>
      {book.authors &&
        <div className="book-authors">{book.authors.join(', ')}</div>
      }
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default Book
