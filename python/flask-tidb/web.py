# import necessary packages
import flask
import json
import MySQLdb

# create the flask app
app = flask.Flask(__name__)
app.config["DEBUG"] = True

# configuration used to connect to TiDB Cloud
config = {
   'host': 'gateway01.us-east-1.prod.aws.tidbcloud.com',
   'port': 4000,
   'user': 'eVXuu913VEc1sm5.root',
   'password': '9cyRizCLXtgevcNQ',
   'database': 'sample_data',
   'ssl_mode': "VERIFY_IDENTITY", 
   'ssl': {"ca": "/etc/ssl/certs/ca-certificates.crt"}
}


@app.route('/fruit', methods=['GET'])
def index():
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
  # cursor.execute("SELECT VERSION()")
  cursor.execute("SELECT * FROM fruit")
  data = cursor.fetchall()
  if data:
    print('Version retrieved: ', data[0])
  else:
    print('Version not retrieved.')

  dbconnect.close()

  # return the results!
  return 'hello'+data[0][0]


# run the app
app.run()