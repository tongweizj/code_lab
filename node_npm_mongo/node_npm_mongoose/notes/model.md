# Model

1.构造函数, 参数1:集合名称, 参数2:Schema实例 


```JS
    var PersonModel = mongoose.model('Person',PersonSchema);
    //如果该Model已经发布，则可以直接通过名字索引到，如下：
    //var PersonModel = mongoose.model('Person');
    //如果没有发布，上一段代码将会异常
```






    
        
            2.查询, 参数1忽略,或为空对象则返回所有集合文档 




```JS

    model.find({}, callback);
```

```JS
    model.find({},field,callback);
//过滤查询,参数2: {'name':1, 'age':0} 查询文档的返回结果包含name , 不包含age.(_id默认是1)
```

```JS
    model.find({},null,{limit:20},callback);
//过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有.
```

```JS
    model.findOne({}, callback);
//查询找到的第一个文档
```

```JS
    model.findById('obj._id', callback);
//查询找到的第一个文档,同上. 但是只接受 __id 的值查询
```
        
## 3.创建, 在集合中创建一个文档 

```JS
 Model.create(文档数据, callback))
 ```
       
## 4.更新

参数1:查询条件, 
参数2:更新对象,可以使用MondoDB的更新修改器 

```JS
Model.update(conditions, update, function(error){})
```

## 5.删除

参数1:查询条件

```JS
Model.remove(conditions,callback);
```
