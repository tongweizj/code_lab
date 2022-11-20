const Book = require("../../models/book")
const Author = require("../../models/author")
const book = require("../../models/book")
module.exports = {
  book: ({name})  => {
    try {
      // const bookFetched = await Book.find()
      var condition = name ? { name: name} : {};
      return Book.find(condition)
      
    } catch (error) {
      throw error
    }
  },
  books: async () => {
    try {
      // const bookFetched = await Book.find()
      return Book.find()
      
    } catch (error) {
      throw error
    }
  },
  author: ({name}) => {
    
    try {
      // const bookFetched = await Book.find()
      var condition = name ? { name: name} : {};
      return Author.find(condition)
      
    } catch (error) {
      throw error
    }
  },
  authors: async () => {
    try {
      // const bookFetched = await Book.find()
      return Author.find()
      
    } catch (error) {
      throw error
    }
  },
  createBook: async args => {
    try {
      const { name, body } = args.book
      const book = new Book({
        name,
        body,
      })
      // const newBook = await book.save()
      return book.save()
    } catch (error) {
      throw error
    }
  },
  updateBook: ({id, input}) => {
   // 输入数据检验
      console.log(id)
      return Book.findByIdAndUpdate(id, input, { useFindAndModify: false })
  },
  deleteBook: ({id}) => {
    // 输入数据检验
       console.log(id)
       return Book.findByIdAndRemove(id, { useFindAndModify: false })
   },
  createAuthor: async args => {
    try {
      const { name, age } = args.author
      const author = new Author({
        name,
        age,
      })
      // const newBook = await book.save()
      return author.save()
    } catch (error) {
      throw error
    }
  },
  updateAuthor: ({id, input}) => {
    // 输入数据检验
       return Author.findByIdAndUpdate(id, input, { useFindAndModify: false })
   },
   deleteAuthor: ({id}) => {
    // 输入数据检验
       return Author.findByIdAndRemove(id, { useFindAndModify: false })
   },
}