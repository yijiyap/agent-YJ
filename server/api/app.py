# make sure the Flask server is on
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import logging
from test_praw import RedditSearch

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/process-data', methods=['GET','POST'])
@cross_origin(supports_credentials=True, methods=['OPTIONS', 'GET', 'POST'])

def process_data():
    data = request.json.get('data')
    result = RedditSearch(data).reddit_posts
    logging.info(result)
    return jsonify(result)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(host="localhost", port=5733, debug=True)
