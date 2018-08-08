import React from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'

class BooksList extends React.Component {
  render() {
    const {books} = this.props

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
            />
            <Shelf
              books={books.filter((book) => 'wantToRead' === book.shelf)}
              title="Want to Read"
            />
            <Shelf
              books={books.filter((book) => 'read' === book.shelf)}
              title="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList
