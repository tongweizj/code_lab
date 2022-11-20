# readme

<python3 网络爬虫开发实战> 实验
p81

## 需求说明

Spider for https://ssr1.scrape.center/

### TODO

- 爬取站点所有电影列表页面
  - 每个电影详情页 url的规则\提取规则
  - 每个列表页的 url 规则\提取规则
- 爬取每个电影的详情页(用到 requests 库)
- 提取电影详情页中的电影信息(使用 正则表达式)
- 提取内容保存成 json
- 实现多进程爬取

## 代码说明

### PyQuery + MongoDB + 多进程版

见 [spider_pyquery.py](spider_pyquery.py)

### 正则表达式 + 文本 + 多进程版

见 [spider_reg.py](spider_reg.py)