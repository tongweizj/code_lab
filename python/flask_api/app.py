import os
from flask import Flask
from flask_cors import CORS
from api.news import news_route

app = Flask(__name__)
app.register_blueprint(news_route)

CORS(app)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")