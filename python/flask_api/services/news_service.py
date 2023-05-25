# import necessary packages
import flask
import json
import MySQLdb
def add_news_service(news_data):
  dbconnect = MySQLdb.connect(
  host="gateway01.us-east-1.prod.aws.tidbcloud.com",
  port=4000,
  user="eVXuu913VEc1sm5.root",
  password='9cyRizCLXtgevcNQ',
  database='test',
  ssl_mode="VERIFY_IDENTITY",
      ssl={
        "ca": "/etc/ssl/certs/ca-certificates.crt"
        }
      )
  cursor = dbconnect.cursor()
  try:
    query = 'INSERT INTO yoese.news (author, content, description, publishedAt, source, title, url, urlToImage) VALUES(%s, %s, %s, %s, %s, %s, %s, %s);'
    cursor.executemany(query, news_data)
  
    return make_response({'message' : 'succesfully inserted'}, 201)   
  except Exception as e:
      return make_response({'message' : str(e)}, 404)  
