# README

## 1. 目标

1. 合理的目录结构
2. 实现查询、添加、修改功能

## 2. 计划

### 0.1

- 查：所有书
- 查：所有作者
- 增加一本书
- 增加：一个作者

### 0.2

- 修改：根据ID修改书本信息
- 修改：根据ID，修改作者信息
- 删： 一本书
- 删： 根据作者ID，删作者

## 3. 简单功能需求说明

### 表结构

#### book

```
name
author
```

#### author

```
name
age
books
```

### book接口功能

#### 增加一本书

```json
mutation{
  createBook(book:{name:"NodeJS", body:"good at NodeJS"}){
    name
    body
  }
}
```

#### 删： 一本书 (0.2)

```json
# mutation{
   deleteBook(
     id:"5fa9ade01b98722571729f94",
   ){
     id
     name
     body
   }
}
```

#### 修改：根据ID修改书本信息(0.2)

```json
mutation{
  updateBook(
    id:"5fa9ade01b98722571729f94",
    input:{
      name:"Book223333",
      body:"222xxxxxxxxxx"
    }
  ){
    id
    name
    body
  }
}
```

#### 查：根据书名查书

```json
{
  book(name:"NodeJS"){
    id
    name
    body
  }
}
```

#### 查：所有书(0.1)

```json
{
  books{
    id
    name
    body
  }
}
```

### author接口功能

#### 增加：一个作者(0.1)

```json
mutation{
 createAuthor(author:{name:"Max", age:"38"}){
   name
   age
 }
}
```

#### 删： 根据作者ID，删作者(0.2)
```json
mutation{
  deleteAuthor(
    id:"5fa9b07693790b27d0427214",
  ){
    id
    name
    age
  }
}
```

#### 修改：根据ID，修改作者信息(0.2)

```json
mutation{
  updateAuthor(
    id:"5fa9b07693790b27d0427214",
    input:{
      name:"Max",
      age:"40"
    }
  ){
    id
    name
    age
  }
}
```

#### 查：根据作者名字，查作者信息和作者写的书
```json

{
  author(name:"Tong"){
    id
    name
    age
  }
}

```

结果

```json
{
  "data": {
    "author": [
      {
        "id": "5fa9dacd6602663c30ec1726",
        "name": "Tong",
        "age": "40"
      }
    ]
  }
}
```

#### 查：所有作者(0.1)

```json
{
  authors{
    id
    name
    age
  }
}
```
## 参考
https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1