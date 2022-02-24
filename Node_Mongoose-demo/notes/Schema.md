# Schema

## 1. 定义 Schema

数据库中的 Schema，为数据库对象的集合。

- schema 是 mongoose 里会用到的一种数据模式， 可以理解为表结构的定义;
- 每个 schema 会映射到 mongodb 中的一个 collection，它不具备 操作数据库的能力

```bash
var UserSchema = mongoose.Schema({ 
    name: String,
    age: Number,
    status: 'number'
})
``` 

### 3、创建数据模型

定义好了 Schema，接下就是生成 Model。
model 是由 schema 生成的模型，可以对数据库的操作。

注意:

- mongoose.model 里面可以传入两个参数也可以传入三个参数 
- mongoose.model(参数 1:模型名称(首字母大写)，参数 2:Schema)

## 3. Schema的方法

```JS
Schema.method('say', function() {
  console.log('hello');
})
//这样Model和Entity的实例就能使用这个方法了
```

### 静态方法

```JS
Schema.static('say', function() {
  console.log('hello');
})
//静态方法，只限于在Model层就能使用
```

#### 批量添加

```JS
Schema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb)
  }
}

```