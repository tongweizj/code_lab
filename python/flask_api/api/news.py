# import libraries
from flask import Blueprint, request
from newsapi import NewsApiClient
  
news_route = Blueprint('news_route', __name__)
  
@news_route.route("/api/v1/news/top", methods=['GET'])
def top():
  newsapi = NewsApiClient(api_key='193987c7020b430db6f3deb45b2f55a4')
  top_headlines = newsapi.get_top_headlines(country="ca")
  total_results = top_headlines['totalResults']
  print(total_results)
  return top_headlines
# Init news api


# /v2/top-headlines
# top_headlines = newsapi.get_top_headlines(country='cn')

# this function returns a JSON object
# top_headlines = newsapi.get_top_headlines(country="ca")
# total_results = top_headlines['totalResults']

# the maximum value for page_size parameter is 100
# so we need to keep it at max 100
# if total_results > 100:
# 	total_results = 100

# fetch articles where no. of articles=total_results
# this returns a list of articles
# all_headlines = newsapi.get_top_headlines(country="cn",
# 										page_size=total_results)['articles']
# print(all_headlines)


# /v2/everything
# all_articles = newsapi.get_everything(q='Couch Potato Portfolio',from_param='2023-05-18')
# print(all_articles)