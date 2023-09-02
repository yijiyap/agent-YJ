# make sure the Flask server is on
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from test_praw import RedditSearch

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/process-data', methods=['POST'])
@cross_origin()

def process_data():
    data = request.json.get('data')
    result = RedditSearch(data).reddit_posts
    return jsonify(result)

if __name__ == '__main__':
    app.run()
