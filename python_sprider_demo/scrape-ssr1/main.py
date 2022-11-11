from trace import CoverageResults
from urllib import response
import requests
import logging # 日志库
import re # 正则表达式
import multiprocessing

from urllib.parse import urljoin

from save import save_data
from scrape_page import scrape_page

logging.basicConfig(level=logging.INFO,format='%(asctime)s-%(levelname)s:%(message)s')

Base_Url = 'https://ssr1.scrape.center'
Total_Page = 10

# 通用的爬取页面模块
# 支持列表页和详情页
# def scrape_page(url):
#   logging.info('Scraping %s...',url)
#   try:
#     response = requests.get(url)
#     if response.status_code == 200:
#       return response.text
#     logging.error('get invlid status code %s while scraping %s', response.status_code, url)
#   except requests.RequestException:
#     logging.error('error occurred while scraping %s', url,exc_info=True)

# 索引爬取模块
# 拼接 URl
# 获取页面代码 
def scrape_index(page):
  index_url = f'{Base_Url}/page/{page}'
  return scrape_page(index_url)

# 详情页爬取模块
# 获取页面代码 
def scrape_detail(url):
  return scrape_page(url)

# 解析索引页面内容
# 提取需要的内容
def pares_index(html):
  pattern = re.compile('<a.*?href="(.*?)".*?class="name">')
  items = re.findall(pattern,html)
  if not items:
    return []
  for item in items:
    detail_url = urljoin(Base_Url, item)
    logging.info('get detail url %s', detail_url)
    yield detail_url



# 详情页面内容解析
# 提取需要的内容
def pares_detail(html):
  cover_pattern = re.compile('class="item.*?<img.*?src="(.*?)".*?class="cover">', re.S)
  name_pattern = re.compile('<h2.*?>(.*?)</h2>') 
  cover = re.search(cover_pattern,html).group(1).strip() if re.search(cover_pattern,html) else None
  name = re.search(name_pattern,html).group(1).strip() if re.search(name_pattern,html) else None
  return {'cover':cover,'name':name}

# 调度
def main():
  for page in range(1,Total_Page+1): # 把这里的循环遍历,转到了下面的进程池完成
    index_html = scrape_index(page)
    detail_urls = pares_index(index_html)
    # logging.info('detail urls %s', list(detail_urls))

    for detail_url in detail_urls:
      detail_html = scrape_detail(detail_url)
      data = pares_detail(detail_html)
      logging.info('get detail data %s', data)
      logging.info('save data to json file')
      save_data(data)
      logging.info('data save successfully')
    

if __name__ == '__main__':
  main()
