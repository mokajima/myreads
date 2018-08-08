import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveBook = (book, shelf) => {

    if ('none' === book.shelf) {

      // Add the book
      book.shelf = shelf
      this.setState((prevState) => {
        prevState.books.push(book)
        return prevState
      })

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
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList books={this.state.books} moveBook={this.moveBook} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} moveBook={this.moveBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
