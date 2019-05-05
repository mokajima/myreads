import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
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
    book.shelf = shelf

    if (book.shelf === 'none') { // Add the book
      this.setState(prevState => ({
        books: prevState.books.concat(book)
      }))
    } else { // Move the book
      this.setState(prevState => ({
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
        <Switch>
          <Route exact path="/" render={() => (
            <BooksList books={books} moveBook={this.moveBook} />
          )} />
          <Route path="/search" render={() => (
            <SearchBooks books={books} moveBook={this.moveBook} />
          )} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
