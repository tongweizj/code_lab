const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Book {
    id:ID
    name: String!
    body: String!
  }

  type Author {
    id:ID
    name: String!
    age: String!
  }
  input AuthorInput {
    name: String!
    age: String!
  }
  input BookInput {
    name: String!
    body: String!
  }
  type Query {
    book(name: String!):[Book!],
    books:[Book!],
    author(name: String!):[Author!],
    authors:[Author!]
  }

  type Mutation {
    createBook(book:BookInput): Book,
    updateBook(id: ID!, input: BookInput): Book
    deleteBook(id: ID!): Book
    createAuthor(author:AuthorInput): Author
    updateAuthor(id: ID!, input: AuthorInput): Author
    deleteAuthor(id: ID!): Author
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)