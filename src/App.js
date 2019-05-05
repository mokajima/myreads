import React from 'react'
import {Route} from 'react-router-dom'
import Helmet from 'react-helmet'
import * as BooksAPI from './utils/BooksAPI'
import BooksList from './components/BooksList'
import SearchBooks from './components/SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }

  /**
  * @description Move a book between shelves
  * @param {object} book - the book object
  * @param {string} shelf - contains one of ["wantToRead", "currentlyReading", "read"]
  */
  moveBook = (book, shelf) => {

    if ('none' === book.shelf) {

      // Add the book
      book.shelf = shelf
      this.setState((prevState) => ({
        books: prevState.books.concat(book)
      }))

    } else {

      // Move the book
      book.shelf = shelf
      this.setState((prevState) => ({
        books: prevState.books.map((b) => book.id === b.id ? book : b)
      }))

    }

    BooksAPI.update(book, shelf)
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Helmet>
          <title>MyReads</title>
        </Helmet>
        <Route exact path="/" render={() => (
          <BooksList books={books} moveBook={this.moveBook} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks books={books} moveBook={this.moveBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
