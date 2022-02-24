# Entity 实例

## 1.构造函数, 其实就是model的实例

```JS
new TestModel( { name:'xueyou', age:21 } );复制代码
```

## 2.创建, 在集合中创建一个文档

```JS
Entity.save(callback);
```