const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;

// 模拟的数据
const books = [{
        id: "1",
        name: "java",
        authorId: "2"
    },
    {
        id: "2",
        name: "spring",
        authorId: "3"
    },
    {
        id: "3",
        name: "nodejs",
        authorId: "1"
    },
    {
        id: "4",
        name: "python",
        authorId: "2"
    },
    {
        id: "5",
        name: "swift",
        authorId: "1"
    },
    {
        id: "6",
        name: "hibernate",
        authorId: "3"
    }
];
const authors = [{
        name: "tomcat",
        age: 12,
        id: "1"
    },
    {
        name: "jetty",
        age: 22,
        id: "2"
    },
    {
        name: "maven",
        age: 21,
        id: "3"
    }
];



// 定义Book的数据结构
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {
                    id: parent.authorId
                });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType), // 这里要用new的方式来定义类型，不能直接给books指定成GraphQLList
            resolve(parent, args) {
                // 同样的 parent 表示 author的信息，下面就是从parent里拿到id再去books数据里找authorId为当前作者的书本数据
                return _.filter(books, {
                    authorId: parent.id
                });
            }
        },
    })
});
// 定义查询方法
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(books, {
                    id: args.id
                });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }, // 判断非空
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                } // 判断非空
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: AuthorType,
            args: {
                //   name: { type: GraphQLString },
                //   authorId: { type: GraphQLString }
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }, // 判断非空
                authorId: {
                    type: new GraphQLNonNull(GraphQLString)
                } // 判断非空
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

// 构建schema并导出
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});