import praw
import os
from dotenv import load_dotenv
load_dotenv()

reddit = praw.Reddit(
    client_id = os.getenv("CLIENT_ID"),
    client_secret = os.getenv("CLIENT_SECRET"),
    redirect_uri = os.getenv("REDIRECT_URI"),
    user_agent = os.getenv("USER_AGENT"),
)
reddit.read_only = True

# takes in user input of the item that they want to search W2C for
user_input = "yeezy 350"

# url = 'https://www.reddit.com/r/FashionReps/comments/1351e1k/157kg_pandabuy_haul_to_germany_jordan_4_white/'
# submission = reddit.submission(url=url)

# =============================================================================
# some posts may not have a gallery, so we need to check for that
# =============================================================================

# create a list of RedditPost objects, depending on what the user searches for
class RedditSearch:
    def __init__(self, query):  
        self.query = query
        self.search_results = reddit.subreddit('FashionReps').search(query, limit=12)
        self.reddit_posts = {}
        i = 0
        for submission in self.search_results:
            # only want top 6 results
            if i == 5: 
                break
            for item in sorted(submission.gallery_data['items'], key=lambda x: x['id']):
                media_id = item['media_id']
                meta = submission.media_metadata[media_id]
                if meta['e'] == 'Image':
                    source = meta['s']
                    caption = item.get('caption', 'Caption not available')
                    caption_link = item.get('outbound_url', 'Caption link not available')
                    image_url = source['u']
                    if caption_link == 'Caption link not available':
                        continue
                    self.reddit_posts[i] = {'title': submission.title, 'caption': caption, 'caption_link' : caption_link, 'image_url' : image_url}
                    i += 1
                    break
