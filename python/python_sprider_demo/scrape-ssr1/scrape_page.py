import requests
import logging

def scrape_page(url):
    """
    scrape page by url and return its html
    :param url: page url
    :return: html of page
    """
    logging.info('scraping %s...', url)
    try:
#         利用 urllib 发起的请求，UA 默认是 Python-urllib/3.5 而在 chrome 中访问 UA 则是 User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36，因为服务器根据 UA 来判断拒绝了 python 爬虫。
# 把 python 伪装成 chrome 去获取糗百的网页，可以顺利的得到数据。
        headers = requests.utils.default_headers()
        headers.update(
            {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        )
        response = requests.get(url,headers=headers)
        if response.status_code == 200:
            return response.text
        logging.error('get invalid status code %s while scraping %s', response.status_code, url)
    except requests.RequestException:
        logging.error('error occurred while scraping %s', url, exc_info=True)
