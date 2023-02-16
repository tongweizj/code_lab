# -*- coding: UTF-8 -*-
from bs4 import BeautifulSoup

html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<div id="test">
<p class="title" name="dromouse">The Dormouse's story</p></div>

<p class="story" name="dromouse">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.
</p>

<p class="story">...</p>
"""


soup = BeautifulSoup(html_doc, 'lxml')
# print(soup.prettify())
print(soup)
print(soup.attrs)
## tag
print(soup.title)
## tag name
print(soup.title.name)

## tag attrs
print(soup.div.p)
print(soup.p.attrs)
print(soup.p.attrs['name'])
print(soup.p['name']) # 上下等效

## 节点元素里的 内容 
## <p>这一部分内容</>
print(soup.title.string)
# # print(soup.head)
# print(soup.a)

# print(soup.div)  # 获取第一个div标签中的所有内容
# print(soup.div["id"]) # 获取第一个div标签的id的值
# print(soup.a) 

# print(soup.find_all("a")) # 获取所有的a标签
# print(soup.find(id="u1")) # 获取id="u1"

# for item in soup.find_all("a"):     
#   print(item.get("href")) # 获取所有的a标签，并遍历打印a标签中的href的值

# for item in soup.find_all("a"):     
#   print(item.get_text())